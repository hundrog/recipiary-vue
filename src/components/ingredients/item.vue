<script setup lang="ts">
const props = defineProps(["ingredient"])

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Pencil } from 'lucide-vue-next'
import { useDialogStore } from '@/stores/dialog'

const store = useDialogStore()

const colorClass = (color) => {
  return color ? `bg-${color}-400` : 'bg-muted-foreground'
}

function openModal() {
  store.open()
}
</script>

<template>
  <div class="flex justify-between items-center hover:bg-muted min-h-20 bg-card border px-4 md:px-12">
    <div class="min-w-24 max-w-36 font-bold">{{ ingredient.Name }}</div>
    <div class="flex gap-2">
      <div class="py-4 px-6 rounded-md" :class="[colorClass(ingredient.Category.Color)]" />
    </div>
    <div class="flex space-x-1 md:space-x-2">
      <ResourcesUpsert title="Edit ingredient"
        description="Make changes to your ingredient here. Click save when you're done.">
        <template #trigger>
          <Button variant="outline" size="icon" @click="openModal">
            <Pencil class="size-4" />
          </Button>
        </template>
        <template #content>
          <IngredientsForm :ingredient="ingredient" />
        </template>
      </ResourcesUpsert>
      <ResourcesDelete name="ingredient">
        <!-- <CategoriesDelete :ingredientID="ingredient.ID" /> -->
      </ResourcesDelete>
    </div>
  </div>
</template>
