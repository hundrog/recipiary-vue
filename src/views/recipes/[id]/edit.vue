<script setup lang="ts">
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs'
import { useRecipeStore } from '@/stores/recipe'
import { useInstructionStore } from '@/stores/instruction'
import { useIngredientStore } from '@/stores/ingredient'
import { useRecipeIngredientStore } from '@/stores/recipeIngredient'

const route = useRoute()
const recipeStore = useRecipeStore()
const recipeIngredientStore = useRecipeIngredientStore()
const instructionStore = useInstructionStore()
const ingredientStore = useIngredientStore()

await recipeStore.get(route.params.id)
await recipeIngredientStore.list(route.params.id)
await instructionStore.list(route.params.id)
await ingredientStore.list()

const recipe = toRef(recipeStore.recipe)
const recipeIngredients = toRef(recipeIngredientStore.recipeIngredients)
const instructions = toRef(instructionStore.instructions)
</script>

<template>
  <div class="mx-auto max-w-screen-2xl">
    <LayoutBackButton :route="`/recipes/${route.params.id}`" justify="end" />
    <Tabs default-value="recipe">
      <TabsList class="grid w-full grid-cols-3">
        <TabsTrigger value="recipe">
          Recipe
        </TabsTrigger>
        <TabsTrigger value="ingredients">
          Ingredients
        </TabsTrigger>
        <TabsTrigger value="instructions">
          Instructions
        </TabsTrigger>
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
