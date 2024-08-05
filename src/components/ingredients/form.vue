<script lang="ts" setup>
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { useDialogStore } from '@/stores/dialog'
import { useCategoryStore } from '@/stores/category'
import { useIngredientStore } from '@/stores/ingredient'
import { ref } from 'vue'

const dialog = useDialogStore()
const categoryStore = useCategoryStore()
const ingredientStore = useIngredientStore()
const props = defineProps(["ingredient"])
const name = ref()
const categoryId = ref()

function onSubmit() {
  ingredientStore.upsert({
    ID: props.ingredient.ID,
    Name: name.value,
    CategoryId: categoryId.value
  })

  dialog.close()
}
</script>

<template>
  <form class="grid items-start gap-4" @submit.prevent="onSubmit">
    <div class="grid gap-2">
      <Label html-for="name">Name</Label>
      <Input id="name" :default-value="ingredient.Name" v-model="name" />
    </div>
    <div class="grid gap-2">
      <Label html-for="categoryId">Category</Label>
      <Select id="categoryId" :default-Value="ingredient.CategoryId" v-model="categoryId">
        <SelectTrigger class="">
          <SelectValue placeholder="Select a category" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Category</SelectLabel>
            <SelectItem v-for="category in categoryStore.categories" :value="category.ID" :key="category.ID">
              <div class="flex">
                <div class="px-6 py-2 mx-2 rounded-md" :class="[`bg-${category.Color}-400`]"></div>
                {{ category.Name }}
              </div>
            </SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
    <Button type="submit">
      Save changes
    </Button>
  </form>
</template>
