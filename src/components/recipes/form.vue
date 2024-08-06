<script setup lang="ts">
import { useRecipeStore } from '@/stores/recipe'
import { ref } from 'vue'
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
</script>

<template>
  <Card class="xl:w-[600px]">
    <form @submit.prevent="onSubmit">
      <CardHeader>
        <CardTitle>Recipe</CardTitle>
        <CardDescription> </CardDescription>
      </CardHeader>
      <CardContent class="space-y-2">
        <img
          class="mb-4 w-full sm:max-w-xl"
          src="https://images.unsplash.com/photo-1604908176997-125f25cc6f3d"
        />
        <div class="space-y-1">
          <Label for="name">Name</Label>
          <Input id="name" :default-value="recipe.Name" v-model="name" />
        </div>
        <div class="space-y-1">
          <Label for="description">Description</Label>
          <Input id="description" :default-value="recipe.Description" v-model="description" />
        </div>
        <div class="space-y-1 hidden">
          <Label for="imageUrl">Image URL</Label>
          <Input id="imageUrl" disabled :default-value="recipe.ImageUrl" v-model="uri" />
        </div>
      </CardContent>
      <CardFooter class="justify-end">
        <Button type="submit">Save Details</Button>
      </CardFooter>
    </form>
  </Card>
</template>

<style scoped></style>
