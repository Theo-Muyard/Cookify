<script setup>
import Header from "../components/Header.vue";
import axiosInstance from "../tools/axios.tool";

async function logout() {
  try {
    const res = await axiosInstance.post("/auth/logout");

  } catch (error) {
    
  }
}

</script>

<template>
  <Header />
  <button @click="logout">Logout</button>
</template>
