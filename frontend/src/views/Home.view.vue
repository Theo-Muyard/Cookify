<script setup>
import Header from "../components/Header.vue";
import RecipeCard from "../components/RecipeCard.vue";
</script>

<template>
  <Header />
  <div
    class="bg-[url(/assets/cookify_bg.jpg)] bg-cover  min-h-screen w-full px-5 py-10"
  >
    <div class="flex gap-5 flex-wrap justify-center">
      <RecipeCard title="Poulet au curry" img="/assets/poulet_curry.jpg" />
      <RecipeCard title="Carbonara" img="/assets/carbonara.jpg"/>
      <RecipeCard title="Soupe" img="/assets/soupe.jpg" />
      <RecipeCard title="Soupe" img="/assets/soupe.jpg" />
      <RecipeCard title="Soupe" img="/assets/soupe.jpg" />
      <RecipeCard title="Soupe" img="/assets/soupe.jpg" />
    </div>
  </div>
</template>
<style></style>
