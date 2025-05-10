<script setup>
import Header from "../components/Header.vue";
import { ref } from "vue";
import axiosInstance from "../tools/axios.tool";

// Form traitment
const fullName = ref("");
const email = ref("");
const password = ref("");

const notification = ref({
  show: false,
  error: false,
  message: "",
});

function showNotification(message, error) {
  notification.value.show = true;
  notification.value.message = message;
  if (error) {
    notification.value.error = true;
  }

  setTimeout(() => {
    notification.value = {
      show: false,
      error: false,
      message: "",
    };
  }, 3000);
}

const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const res = await axiosInstance.post("/auth/signup", {
      fullName: fullName.value,
      email: email.value,
      password: password.value,
    });

    showNotification(res.data.message, false);
  } catch (error) {
    const res = await error.response;
    showNotification(res.data.message, true);
  }

  fullName.value = "";
  email.value = "";
  password.value = "";
};
</script>

<template>
  <div class="h-screen w-screen flex flex-col">
    <!-- HEADER -->
    <Header />

    <!-- MAIN -->
    <main class="h-full flex flex-col lg:flex-row">
      <!-- Alerts -->
      <div
        v-if="notification.show"
        :class="[
          'alert fixed top-25 right-1/2 translate-1/2 w-1/3 ',
          notification.error ? 'alert-error' : 'alert-success',
        ]"
      >
        {{ notification.message }}
      </div>

      <!-- Form Container -->
      <div class="flex-1 flex-center flex-col mt-2 md:mt-10 gap-10">
        <div class="text-center flex gap-2 flex-col">
          <h1 class="text-2xl font-bold md:text-3xl">Create Account</h1>
          <p class="tracking-wider text-sm md:text-base">
            Get started with you free account
          </p>
        </div>

        <form
          @submit="handleSubmit"
          id="signupForm"
          class="flex-center flex-col gap-5 p-5 w-full"
        >
          <!-- FullName -->
          <div class="w-full md:max-w-150 flex flex-col gap-2">
            <label for="">Full Name</label>
            <label class="input validator input-md md:input-lg w-full">
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
                  <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path>
                  <circle cx="12" cy="7" r="4"></circle>
                </g>
              </svg>
              <input
                v-model="fullName"
                type="text"
                required
                placeholder="Username"
                pattern="[A-Za-z][A-Za-z0-9\-]*"
                minlength="3"
                maxlength="30"
                title="Only letters, numbers or dash"
              />
            </label>
          </div>

          <!-- Email -->
          <div class="w-full md:max-w-150 flex flex-col gap-2">
            <label class="" for="">Email</label>
            <label class="input validator input-md md:input-lg w-full">
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
          </div>

          <!-- Password -->
          <div class="w-full md:max-w-150 flex flex-col gap-2">
            <label class="" for="">Password</label>
            <label class="input validator input-md md:input-lg w-full">
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
                  <circle
                    cx="16.5"
                    cy="7.5"
                    r=".5"
                    fill="currentColor"
                  ></circle>
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

          <!-- Button -->
          <button
            class="w-full md:max-w-150 btn btn-soft btn-primary btn-sm md:btn-md lg:btn-lg"
          >
            Create Account
          </button>

          <div>
            Already have an account? <a class="link" href="/login">Sign in</a>
          </div>
        </form>
      </div>
      <!-- Decoration -->
      <div class="bg-warning-content hidden md:block lg:flex-1 flex-center">
        <img src="" alt="" />
      </div>
    </main>
  </div>
</template>
