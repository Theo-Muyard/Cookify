import { createWebHistory, createRouter } from "vue-router";
import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";

// Views
import SignupView from "./views/Signup.view.vue";
import LoginView from "./views/Login.view.vue";
import HomeView from "./views/Home.view.vue";
import axiosInstance from "./tools/axios.tool";
const routes = [
  // Home
  {
    path: "/",
    name: "Home",
    component: HomeView,
    meta: { requiresAuth: true },
  },
  // Auth
  {
    path: "/signup",
    name: "Signup",
    component: SignupView,
    meta: { guestOnly: true },
  },
  {
    path: "/login",
    name: "Login",
    component: LoginView,
    meta: { guestOnly: true },
  },
];

export const router = createRouter({
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
