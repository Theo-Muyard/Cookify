<script setup>
import Notification from "../components/Notification.vue";
import { ref } from "vue";
import axiosInstance from "../tools/axios.tool";
import { router } from "../main.js";

const email = ref("");
const password = ref("");

const loading = ref(false);

const notification = ref({
  show: false,
  message: null,
  success: null,
});

async function submittedForm() {
  if (loading.value) return;
  try {
    loading.value = true;
    const res = await axiosInstance.post("auth/login", {
      email: email.value,
      password: password.value,
    });

    notification.value.success = true;
    notification.value.show = true;
    notification.value.message = res.data.message;
  } catch (error) {
    notification.value.success = false;
    notification.value.show = true;
    notification.value.message = error.response.data.message;
  } finally {
    loading.value = false;
  }

  setTimeout(() => {
    if (notification.value.success) {
      setTimeout(() => {
        router.push({ name: "Home" });
      }, 1000);
    }
    notification.value = {
      show: false,
      message: null,
      success: null,
    };
  }, 2000);
}
</script>

<template>
  <!-- Notif -->
  <Notification :success="notification.success" :show="notification.show">{{
    notification.message
  }}</Notification>

  <div
    class="bg-[url(/assets/cookify_bg.jpg)] bg-cover h-screen w-full flex justify-center items-center"
  >
    <!-- Container Signup -->
    <form
      @submit.prevent="submittedForm"
      class="bg-neutral w-full mx-5 rounded-md flex flex-col gap-10 p-8 max-w-110"
    >
      <!-- Text -->
      <div class="text-center">
        <h2 class="text-primary text-2xl font-medium md:text-3xl">
          Welcome Back
        </h2>
        <span class="text-secondary">Sign in to your account</span>
      </div>
      <!-- Champs -->
      <div class="flex flex-col justify-between items-center flex-1 gap-5">
        <label
          class="input validator bg-transparent text-secondary border-secondary w-full md:input-lg"
        >
          <svg
            class="h-[1em] opacity-50"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
          >
            <g
              stroke-linejoin="round"
              stroke-linecap="round"
              stroke-width="2.5"
              fill="none"
              stroke="currentColor"
            >
              <rect width="20" height="16" x="2" y="4" rx="2"></rect>
              <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
            </g>
          </svg>
          <input
            v-model="email"
            type="email"
            placeholder="mail@site.com"
            required
          />
        </label>
        <label
          class="input validator bg-transparent text-secondary border-secondary w-full md:input-lg"
        >
          <svg
            class="h-[1em] opacity-50"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
          >
            <g
              stroke-linejoin="round"
              stroke-linecap="round"
              stroke-width="2.5"
              fill="none"
              stroke="currentColor"
            >
              <path
                d="M2.586 17.414A2 2 0 0 0 2 18.828V21a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h1a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h.172a2 2 0 0 0 1.414-.586l.814-.814a6.5 6.5 0 1 0-4-4z"
              ></path>
              <circle cx="16.5" cy="7.5" r=".5" fill="currentColor"></circle>
            </g>
          </svg>
          <input
            v-model="password"
            type="password"
            required
            placeholder="Password"
            minlength="8"
            pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
            title="Must be more than 8 characters, including number, lowercase letter, uppercase letter"
          />
        </label>
      </div>
      <div>
        <!-- Button -->
        <button
          class="bg-primary text-neutral py-2 rounded-sm w-full mb-2 md:text-xl"
        >
          <span
            v-if="loading"
            class="loading loading-spinner loading-xs"
          ></span>
          <span v-else>Sign in</span>
        </button>
        <!-- Text -->
        <p class="text-secondary text-center">
          Don't have an account?
          <a href="/signup" class="text-primary">Create account</a>
        </p>
      </div>
    </form>
  </div>
</template>
