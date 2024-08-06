<script setup lang="ts">
import { useRecipeStore } from '@/stores/recipe'
import { useInstructionStore } from '@/stores/instruction'
import { useRecipeIngredientStore } from '@/stores/recipeIngredient'
import { Separator } from '@/components/ui/separator'
import { onMounted, toRef, watch } from 'vue'
import { useRoute } from 'vue-router'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import LayoutBackButton from '@/components/layout/backButton.vue'

const route = useRoute()
const recipeStore = useRecipeStore()
const recipeIngredientStore = useRecipeIngredientStore()
const instructionStore = useInstructionStore()

const recipe = toRef(recipeStore.recipe)
const recipeIngredients = toRef(recipeIngredientStore.recipeIngredients)
const instructions = toRef(instructionStore.instructions)

onMounted(async () => {
  await recipeStore.get(route.params.id)
  await recipeIngredientStore.list(route.params.id)
  await instructionStore.list(route.params.id)

  recipe.value = recipeStore.recipe
  recipeIngredients.value = recipeIngredientStore.recipeIngredients
  instructions.value = instructionStore.instructions
})
</script>

<template>
  <div class="mx-auto max-w-screen-2xl">
    <LayoutBackButton route="/recipes" justify="end" />
    <Card>
      <CardHeader class="flex flex-col">
        <img class="mb-4 w-full sm:max-w-lg" :src="recipe.ImageUrl" />
        <CardTitle>{{ recipe.Name }}</CardTitle>
        <CardDescription>{{ recipe.Description }}</CardDescription>
      </CardHeader>
      <CardContent class="mx-4">
        <Separator class="" />
        <div class="text-xl mb-2">Ingredients</div>
        <ul class="list-disc">
          <li v-for="ingredient in recipeIngredients" :key="ingredient.ID">
            {{ ingredient.Amount }} {{ ingredient.Portion }} de {{ ingredient.Name }}
          </li>
        </ul>
        <Separator class="mt-4" />
        <div class="text-xl mb-2">Instructions</div>
        <ul class="list-disc max-w-md">
          <li v-for="instruction in instructions" :key="instruction.ID" class="text-pretty my-2">
            {{ instruction.Content }}
          </li>
        </ul>
      </CardContent>
      <CardFooter class="justify-end space-x-4">
        <Button variant="secondary" as-child>
          <RouterLink :to="`/recipes/${recipe.ID}/edit`">Edit</RouterLink>
        </Button>
      </CardFooter>
    </Card>
  </div>
</template>

<style scoped></style>
