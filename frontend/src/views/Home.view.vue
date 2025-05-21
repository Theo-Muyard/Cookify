<script setup>
import { onMounted, ref } from "vue";
import Header from "../components/Header.vue";
import RecipeCard from "../components/RecipeCard.vue";

import AxiosInstance from "../tools/axios.tool";
const hasRecipes = ref(false);
const errorMessage = ref("");
onMounted(async () => {
  try {
    const res = await AxiosInstance.get("/recipe");
    console.log(res);
    hasRecipes.value = true;
  } catch (error) {
    errorMessage.value = error.response.data.message;
  }
});
</script>

<template>
  <Header />
  <div
    class="bg-[url(/assets/cookify_bg.jpg)] bg-cover min-h-full w-full px-5 py-10"
  >
    <div class="flex gap-5 flex-wrap justify-center">
      <span v-if="!hasRecipes" class="absolute top-1/2 translate-y-1/2 text-2xl md:text-3xl lg:text-4xl">{{ errorMessage }}</span>
      <template v-else>

      </template>
      <!-- <RecipeCard title="Poulet au curry" img="/assets/poulet_curry.jpg" />
      <RecipeCard title="Carbonara" img="/assets/carbonara.jpg" />
      <RecipeCard title="Soupe" img="/assets/soupe.jpg" />
      <RecipeCard title="Soupe" img="/assets/soupe.jpg" />
      <RecipeCard title="Soupe" img="/assets/soupe.jpg" />
      <RecipeCard title="Soupe" img="/assets/soupe.jpg" /> -->
    </div>
  </div>
</template>
<style></style>
