<script setup lang="ts">
import { useDialogStore } from '@/stores/dialog'
import { useCategoryStore, type Category } from '@/stores/category'
import { onMounted, ref } from 'vue'
import ResourcesUpsert from '@/components/resources/upsert.vue'
import CategoriesForm from '@/components/categories/form.vue'
import { Button } from '@/components/ui/button'
import { DataTable } from '@/components/ui/data-table'
import { columns } from '@/components/categories/columns'

const dialog = useDialogStore()
const categoryStore = useCategoryStore()
const data = ref<Category[]>([])

function openModal() {
  dialog.open()
}

onMounted(async () => {
  await categoryStore.list()

  data.value = categoryStore.categories
})
</script>

<template>
  <div class="flex justify-between">
    <h1 class="text-lg font-semibold md:text-2xl">Categories</h1>
    <ResourcesUpsert title="New Category" description="Create your new category here. Click save when you're done."
      v-if="categoryStore.categories.length > 0">
      <template #trigger>
        <Button @click="openModal"> Add Category </Button>
      </template>
      <template #content>
        <CategoriesForm :category="{}" />
      </template>
    </ResourcesUpsert>
  </div>
  <div v-if="categoryStore.categories.length > 0">
    <DataTable :columns="columns" :data="data" />
  </div>
  <div class="flex flex-1 items-center justify-center rounded-lg border border-dashed shadow-sm" v-else>
    <div class="flex flex-col items-center gap-1 text-center">
      <h3 class="text-2xl font-bold tracking-tight">You have no categories</h3>
      <ResourcesUpsert title="New Category" description="Create your new category here. Click save when you're done.">
        <template #trigger>
          <Button @click="openModal"> Add Category </Button>
        </template>
        <template #content>
          <CategoriesForm :category="{}" />
        </template>
      </ResourcesUpsert>
    </div>
  </div>
</template>

<style scoped></style>
