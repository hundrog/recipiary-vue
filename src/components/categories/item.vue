<script setup lang="ts">
const props = defineProps(["category"])

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
import CategoriesForm from './form.vue'
import CategoriesDelete from './delete.vue'
import ResourcesUpsert from '@/components/resources/upsert.vue'
import ResourcesDelete from '@/components/resources/delete.vue'

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
    <div class="min-w-24 max-w-36 font-bold">{{ category.Name }}</div>
    <div>
      <div class="py-4 px-6 rounded-md" :class="[colorClass(category.Color)]" />
    </div>
    <div class="flex space-x-1 md:space-x-2">
      <ResourcesUpsert title="Edit Category"
        description="Make changes to your category here. Click save when you're done.">
        <template #trigger>
          <Button variant="outline" size="icon" @click="openModal">
            <Pencil class="size-4" />
          </Button>
        </template>
        <template #content>
          <CategoriesForm :category="category" />
        </template>
      </ResourcesUpsert>
    </div>
  </div>
</template>
