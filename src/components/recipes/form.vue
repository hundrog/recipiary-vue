<script setup lang="ts">
import { useRecipeStore } from '@/stores/recipe'
import { useImageStore } from '@/stores/image'
import { ref, toRef, watch } from 'vue'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import ResourcesUpsert from '@/components/resources/upsert.vue'
import SearchImage from './searchImage.vue'
const imageStore = useImageStore()

const recipeStore = useRecipeStore()
const props = defineProps(['recipe'])
const name = ref()
const description = ref()
const uri = ref()

function onSubmit() {
  recipeStore.upsert({
    ID: props.recipe.ID,
    Name: name.value,
    Description: description.value,
    ImageUrl: uri.value
  })
}

imageStore.$subscribe((mutation, state) => {
  uri.value = state.uri
})
</script>

<template>
  <Card class="xl:w-[600px]">
    <form @submit.prevent="onSubmit">
      <CardHeader>
        <CardTitle>Recipe</CardTitle>
      </CardHeader>
      <CardContent class="space-y-2">
        <div class="space-y-1">
          <Label for="name">Name</Label>
          <Input id="name" :default-value="recipe.Name" v-model="name" />
        </div>
        <div class="space-y-1">
          <Label for="description">Description</Label>
          <Input id="description" :default-value="recipe.Description" v-model="description" />
        </div>
        <div class="flex w-full tems-center gap-1.5">
          <Input disabled id="imageUrl" :default-value="recipe.ImageUrl" v-model="uri" />
          <ResourcesUpsert>
            <template #trigger>
              <Button type="button">Search image</Button>
            </template>
            <template #content>
              <SearchImage />
            </template>
          </ResourcesUpsert>
        </div>
        <div>
          <img class="mt-4 w-full sm:max-w-xl" :src="uri || recipe.ImageUrl" />
        </div>
      </CardContent>
      <CardFooter class="justify-end">
        <Button type="submit">Save Details</Button>
      </CardFooter>
    </form>
  </Card>
</template>

<style scoped></style>
