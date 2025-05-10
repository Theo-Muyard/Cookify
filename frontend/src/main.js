import { createWebHistory, createRouter } from "vue-router";
import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";

// Pages
import SignupPage from "./pages/Signup.page.vue";
import LoginPage from "./pages/Login.page.vue";
import HomePage from "./pages/Home.page.vue";
import axiosInstance from "./tools/axios.tool";
const routes = [
  // Home
  {
    path: "/",
    name: "Home",
    component: HomePage,
    meta: { requiresAuth: true },
  },
  // Auth
  {
    path: "/signup",
    name: "Signup",
    component: SignupPage,
    meta: { guestOnly: true },
  },
  {
    path: "/login",
    name: "Login",
    component: LoginPage,
    meta: { guestOnly: true },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach(async (to, from, next) => {
  try {
    const res = await axiosInstance.post("/auth/checkAuth");
    const isAuthentificated = !!res.data;

    if (to.meta.requiresAuth && !isAuthentificated) {
      next({ name: "Login" });
    } else if (to.meta.guestOnly && isAuthentificated) {
      next({ name: "Home" });
    } else {
      next();
    }
  } catch (error) {
    if (to.meta.requiresAuth) {
      next({ name: "Login" });
    } else {
      next();
    }
  }
});

createApp(App).use(router).mount("#app");
