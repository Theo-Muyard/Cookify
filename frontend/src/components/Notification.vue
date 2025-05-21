<script setup>
const props = defineProps(["success", "show"]);
</script>

<template>
  <Transition>
    <div
      v-if="show"
      class="bg-error px-20 py-4 flex items-center justify-center flex-col absolute bottom-10 right-5 border-2 border-neutral text-secondary z-10 md:px-25 pointer-none:"
      :class="[success ? 'bg-success' : 'bg-error']"
    >
      <h1 class="text-base text-bold"><slot></slot></h1>
    </div>
  </Transition>
</template>

<style scoped>
.v-enter-active,
.v-leave-active {
  transition: all 0.5s;
}

.v-enter-from {
  opacity: 0;
  transform: translateX(50px);
}

.v-leave-to {
  opacity: 0;
  transform: translateX(50px);
}
</style>
