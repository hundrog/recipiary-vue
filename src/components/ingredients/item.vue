<script setup lang="ts">
defineProps(['ingredient'])
import ResourcesUpsert from '@/components/resources/upsert.vue'
import IngredientsForm from './form.vue'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Pencil } from 'lucide-vue-next'
import { useDialogStore } from '@/stores/dialog'

const store = useDialogStore()

const colorClass = (color: string) => {
  return color ? `text-${color}-600 dark:text-${color}-400` : 'text-muted-foreground'
}

function openModal() {
  store.open()
}
</script>

<template>
  <div class="grid grid-cols-4 gap-4 items-center hover:bg-secondary/45 min-h-20 bg-card border px-4 md:px-12">
    <div class="font-bold col-span-2 sm:col-span-1">{{ ingredient.Name }}</div>
    <div>{{ ingredient.Portion }}</div>
    <Badge variant="secondary" :class="[colorClass(ingredient.Category.Color)]"
      class="hidden sm:flex justify-center max-w-32">
      {{
        ingredient.Category.Name }}</Badge>
    <div class="justify-self-end">
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
    </div>
  </div>
</template>
