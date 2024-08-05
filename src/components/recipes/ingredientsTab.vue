<script setup lang="ts">
import { CircleX, CirclePlus, Pencil } from 'lucide-vue-next'
import { useRecipeIngredientStore } from '@/stores/recipeIngredient'

const recipeIngredientStore = useRecipeIngredientStore()
const dialog = useDialogStore()
const adding = ref(false)
const recipeIngredients = toRef(recipeIngredientStore.recipeIngredients)

recipeIngredientStore.$subscribe((mutation, state) => {
  recipeIngredients.value = state.recipeIngredients
})
</script>

<template>
  <Card class="xl:w-[600px]">
    <CardHeader>
      <div class="flex justify-between items-center">
        <CardTitle>Ingredients</CardTitle>
        <ResourcesUpsert title="New Ingredient" description="Add the new ingredient here. Click save when you're done.">
          <template #trigger>
            <Button class="text-green-700 hover:text-green-500" variant="ghost" size="icon" @click="dialog.open()">
              <CirclePlus />
            </Button>
          </template>
          <template #content>
            <RecipesIngredientsForm :ingredient="{}" />
          </template>
        </ResourcesUpsert>
      </div>
      <CardDescription>
      </CardDescription>
    </CardHeader>
    <CardContent>
      <div v-for="ingredient in recipeIngredients" :key="ingredient.ID" class="grid grid-cols-4 gap-4 space-y-2">
        <div>{{ ingredient.Name }}</div>
        <div>{{ ingredient.Amount }}</div>
        <div>{{ ingredient.Portion }}</div>
        <ResourcesUpsert title="Edit Ingredient"
          description="Change the ingredient amount here. Click save when you're done.">
          <template #trigger>
            <Button variant="outline" size="icon" class="justify-self-end" @click="dialog.open()">
              <Pencil class="size-4" />
            </Button>
          </template>
          <template #content>
            <RecipesIngredientsForm :ingredient="ingredient" />
          </template>
        </ResourcesUpsert>
      </div>
    </CardContent>
  </Card>
</template>
