<script setup>
const props = defineProps(["title", "img"])
</script>

<template>
  <div class="w-full md:max-w-80 md:h-50 h-45 rounded-md relative bg-cover bg-center bg-neutral hover:cursor-pointer hover:scale-98 duration-300" :style=" props.img ? {
    backgroundImage: `url(${props.img})`
  } : {}">
    <div class="bg-primary absolute bottom-0 right-0 left-0 rounded-b-md px-5 py-1 flex justify-between items-center">
      <span class="text-base">{{ title }}</span>
      <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#CCE6F4"><path d="M480-160q-33 0-56.5-23.5T400-240q0-33 23.5-56.5T480-320q33 0 56.5 23.5T560-240q0 33-23.5 56.5T480-160Zm0-240q-33 0-56.5-23.5T400-480q0-33 23.5-56.5T480-560q33 0 56.5 23.5T560-480q0 33-23.5 56.5T480-400Zm0-240q-33 0-56.5-23.5T400-720q0-33 23.5-56.5T480-800q33 0 56.5 23.5T560-720q0 33-23.5 56.5T480-640Z"/></svg>
    </div>
  </div>
</template>