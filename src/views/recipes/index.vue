<script setup lang="ts">
import { useRecipeStore } from '@/stores/recipe'
import { onMounted } from 'vue'
import RecipesList from '@/components/recipes/list.vue'
import { Button } from '@/components/ui/button'

const recipeStore = useRecipeStore()
onMounted(async () => {
  await recipeStore.list()
})
</script>

<template>
  <div class="flex items-center">
    <h1 class="text-lg font-semibold md:text-2xl">
      Recipes
    </h1>
  </div>
  <div v-if="recipeStore.recipes">
    <RecipesList :recipes="recipeStore.recipes" />
  </div>
  <div class="flex flex-1 items-center justify-center rounded-lg border border-dashed shadow-sm" v-else>
    <div class="flex flex-col items-center gap-1 text-center">
      <h3 class="text-2xl font-bold tracking-tight">
        You have no recipes
      </h3>
      <Button class="mt-4">
        Add Recipe
      </Button>
    </div>
  </div>
</template>

<style scoped></style>
