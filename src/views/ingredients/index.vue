<script setup lang="ts">
import { useDialogStore } from '@/stores/dialog'
import { useIngredientStore } from '@/stores/ingredient'
import { useCategoryStore } from '@/stores/category'
import { onMounted } from 'vue'
import ResourcesUpsert from '@/components/resources/upsert.vue'
import IngredientsList from '@/components/ingredients/list.vue'
import IngredientsForm from '@/components/ingredients/form.vue'
import { Button } from '@/components/ui/button'

const dialog = useDialogStore()
const ingredientStore = useIngredientStore()
const categoryStore = useCategoryStore()

onMounted(async () => {
  await ingredientStore.list()
  await categoryStore.list()
})

function openModal() {
  dialog.open()
}
</script>

<template>
  <div class="flex items-center justify-between">
    <h1 class="text-lg font-semibold md:text-2xl">Ingredients</h1>
    <ResourcesUpsert title="New Ingredient" description="Create your new ingredient here. Click save when you're done."
      v-if="ingredientStore.ingredients.length > 0">
      <template #trigger>
        <Button @click="openModal"> Add Ingredient </Button>
      </template>
      <template #content>
        <IngredientsForm :ingredient="{}" />
      </template>
    </ResourcesUpsert>
  </div>
  <div v-if="ingredientStore.ingredients.length > 0">
    <IngredientsList :ingredients="ingredientStore.ingredients" />
  </div>
  <div class="flex flex-1 items-center justify-center rounded-lg border border-dashed shadow-sm" v-else>
    <div class="flex flex-col items-center gap-1 text-center">
      <h3 class="text-2xl font-bold tracking-tight">You have no ingredients</h3>
      <ResourcesUpsert title="New Ingredient"
        description="Create your new ingredient here. Click save when you're done.">
        <template #trigger>
          <Button @click="openModal" class="mt-4"> Add Ingredient </Button>
        </template>
        <template #content>
          <IngredientsForm :ingredient="{}" />
        </template>
      </ResourcesUpsert>
    </div>
  </div>
</template>

<style scoped></style>
