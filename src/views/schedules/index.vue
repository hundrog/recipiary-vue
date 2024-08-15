<script setup lang="ts">
import { useDialogStore } from '@/stores/dialog'
import { useCategoryStore } from '@/stores/category'
import { onMounted } from 'vue'
import ResourcesUpsert from '@/components/resources/upsert.vue'
import CategoriesList from '@/components/categories/list.vue'
import CategoriesForm from '@/components/categories/form.vue'
import { Button } from '@/components/ui/button'

const dialog = useDialogStore()
const categoryStore = useCategoryStore()

function openModal() {
  dialog.open()
}

onMounted(async () => {
  // await categoryStore.list()
})
</script>

<template>
  <div class="flex justify-between">
    <h1 class="text-lg font-semibold md:text-2xl">Schedules</h1>
    <ResourcesUpsert title="New Schedule" description="Create your new schedule here. Click save when you're done."
      v-if="categoryStore.categories.length > 0">
      <template #trigger>
        <Button @click="openModal"> Add Schedule </Button>
      </template>
      <template #content>
        <CategoriesForm :category="{}" />
      </template>
    </ResourcesUpsert>
  </div>
  <div v-if="categoryStore.categories.length > 0">
    <CategoriesList :categories="categoryStore.categories" />
  </div>
  <div class="flex flex-1 items-center justify-center rounded-lg border border-dashed shadow-sm" v-else>
    <div class="flex flex-col items-center gap-1 text-center">
      <h3 class="text-2xl font-bold tracking-tight">You have no schedules</h3>
      <ResourcesUpsert title="New Schedule" description="Create your new schedule here. Click save when you're done.">
        <template #trigger>
          <Button @click="openModal"> Add Schedule </Button>
        </template>
        <template #content>
          <CategoriesForm :category="{}" />
        </template>
      </ResourcesUpsert>
    </div>
  </div>
</template>

<style scoped></style>
