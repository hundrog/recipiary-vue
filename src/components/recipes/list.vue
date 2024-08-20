<script setup lang="ts">
defineProps(['recipes'])
import RecipesItem from './item.vue'
import SchedulesRecipesButton from '@/components/schedules/recipesButton.vue'
</script>

<template>
  <div class="mx-auto max-w-screen-2xl">
    <div class="grid grid-cols-1 xl:grid-cols-2 2xl:grid-cols-4 gap-4">
      <SchedulesRecipesButton />
      <RecipesItem :recipe="recipe" v-for="recipe in recipes" :key="recipe.id" />
    </div>
  </div>
</template>

<style scoped></style>
