<script setup></script>

<template>
  <div
    class="bg-neutral h-15 md:h-15 flex justify-between items-center px-5 md:px-20"
  >
    <img class="h-full w-auto" src="/assets/logo.png" alt="Logo" />
    <svg
      class="h-2/5 w-auto fill-black"
      xmlns="http://www.w3.org/2000/svg"
      height="24px"
      viewBox="0 -960 960 960"
      width="24px"
      fill="#FFFFFF"
    >
      <path
        d="m370-80-16-128q-13-5-24.5-12T307-235l-119 50L78-375l103-78q-1-7-1-13.5v-27q0-6.5 1-13.5L78-585l110-190 119 50q11-8 23-15t24-12l16-128h220l16 128q13 5 24.5 12t22.5 15l119-50 110 190-103 78q1 7 1 13.5v27q0 6.5-2 13.5l103 78-110 190-118-50q-11 8-23 15t-24 12L590-80H370Zm70-80h79l14-106q31-8 57.5-23.5T639-327l99 41 39-68-86-65q5-14 7-29.5t2-31.5q0-16-2-31.5t-7-29.5l86-65-39-68-99 42q-22-23-48.5-38.5T533-694l-13-106h-79l-14 106q-31 8-57.5 23.5T321-633l-99-41-39 68 86 64q-5 15-7 30t-2 32q0 16 2 31t7 30l-86 65 39 68 99-42q22 23 48.5 38.5T427-266l13 106Zm42-180q58 0 99-41t41-99q0-58-41-99t-99-41q-59 0-99.5 41T342-480q0 58 40.5 99t99.5 41Zm-2-140Z"
      />
    </svg>
  </div>

  <div class="bg-primary flex justify-between items-center text-base px-5 h-11 md:h-10 md:text-base md:px-15 lg:px-30 xl:px-50">
    <span class="text-neutral">Add a recipe easily as this</span>
    <button class="bg-neutral text-secondary px-8 py-1 rounded-sm">Create</button>
  </div>
</template>
