<script setup lang="ts">
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

const props = defineProps(["recipe"])
</script>

<template>
  <Card class="">
    <CardHeader>
      <NuxtImg class="mb-2"
        src="https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?q=80&w=1913&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" />
      <CardTitle>{{ recipe.Name }}</CardTitle>
      <CardDescription>{{ recipe.Description }}</CardDescription>
    </CardHeader>
    <CardContent class="flex flex-wrap">
      <Badge variant="secondary" v-for="ingredient in recipe.Ingredients" class="mt-2 mx-0.5">
        {{ ingredient.Name }}
      </Badge>
    </CardContent>
    <CardFooter class="justify-end space-x-4">
      <Button as-child>
        <NuxtLink :to="`/recipes/${recipe.ID}`">Details</NuxtLink>
      </Button>
    </CardFooter>
  </Card>
</template>
