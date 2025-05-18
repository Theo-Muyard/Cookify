<script setup>
defineProps({
  isLoader: Boolean,
});
</script>
<template>
  <div v-if="isLoader" class="h-screen w-screen flex-center">
    <span class="loading loading-infinity w-1/10 h-auto"></span>
  </div>
</template>
