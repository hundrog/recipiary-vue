<script setup lang="ts">
import { useRecipeStore } from '@/stores/recipe'
import { onMounted } from 'vue'
import RecipesList from '@/components/recipes/list.vue'
import { Button } from '@/components/ui/button'

const recipeStore = useRecipeStore()
onMounted(async () => {
  await recipeStore.list()
})

recipeStore.recipe = {}
</script>

<template>
  <div class="flex items-baseline justify-between">
    <h1 class="text-lg font-semibold md:text-2xl">Recipes</h1>
    <Button class="mt-4" as-child>
      <RouterLink to="/recipes/new">
        Add Recipe
      </RouterLink>
    </Button>
  </div>
  <div v-if="recipeStore.recipes.length > 0">
    <RecipesList :recipes="recipeStore.recipes" />
  </div>
  <div class="flex flex-1 items-center justify-center rounded-lg border border-dashed shadow-sm" v-else>
    <div class="flex flex-col items-center gap-1 text-center">
      <h3 class="text-2xl font-bold tracking-tight">You have no recipes</h3>
      <Button class="mt-4" as-child v-if="recipeStore.recipes.length > 0">
        <RouterLink to="/recipes/new">
          Add Recipe
        </RouterLink>
      </Button>
    </div>
  </div>
</template>

<style scoped></style>
