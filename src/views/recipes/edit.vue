<script setup lang="ts">
import { onMounted, toRef } from 'vue'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { useRecipeStore } from '@/stores/recipe'
import { useInstructionStore } from '@/stores/instruction'
import { useIngredientStore } from '@/stores/ingredient'
import { useRecipeIngredientStore } from '@/stores/recipeIngredient'
import { useRoute } from 'vue-router'
import RecipesIngredientsTab from '@/components/recipes/ingredientsTab.vue'
import RecipesInstructionsTab from '@/components/recipes/instructionsTab.vue'
import RecipesForm from '@/components/recipes/form.vue'
import LayoutBackButton from '@/components/layout/backButton.vue'

const route = useRoute()
const recipeId = Number(route.params.id)
const recipeStore = useRecipeStore()
const recipeIngredientStore = useRecipeIngredientStore()
const instructionStore = useInstructionStore()
const ingredientStore = useIngredientStore()

onMounted(async () => {
  await recipeStore.get(recipeId)
  await recipeIngredientStore.list(recipeId)
  await instructionStore.list(recipeId)
  await ingredientStore.list()
})

const recipe = toRef(recipeStore.recipe)
</script>

<template>
  <div class="mx-auto max-w-screen-2xl">
    <LayoutBackButton :route="`/recipes/${recipeId}`" justify="end" />
    <Tabs default-value="recipe">
      <TabsList class="grid w-full grid-cols-3">
        <TabsTrigger value="recipe"> Recipe </TabsTrigger>
        <TabsTrigger value="ingredients"> Ingredients </TabsTrigger>
        <TabsTrigger value="instructions"> Instructions </TabsTrigger>
      </TabsList>
      <TabsContent value="recipe">
        <RecipesForm :recipe="recipe" />
      </TabsContent>
      <TabsContent value="ingredients">
        <RecipesIngredientsTab />
      </TabsContent>
      <TabsContent value="instructions">
        <RecipesInstructionsTab />
      </TabsContent>
    </Tabs>
  </div>
</template>
