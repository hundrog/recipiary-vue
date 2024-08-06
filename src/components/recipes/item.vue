<script setup lang="ts">
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

defineProps(['recipe'])
</script>

<template>
  <Card class="">
    <CardHeader>
      <img class="mb-2" :src="recipe.ImageUrl" />
      <CardTitle>{{ recipe.Name }}</CardTitle>
      <CardDescription>{{ recipe.Description }}</CardDescription>
    </CardHeader>
    <CardContent class="flex flex-wrap">
      <Badge
        variant="secondary"
        v-for="ingredient in recipe.Ingredients"
        :key="ingredient.ID"
        class="mt-2 mx-0.5"
      >
        {{ ingredient.Name }}
      </Badge>
    </CardContent>
    <CardFooter class="justify-end space-x-4">
      <Button as-child>
        <RouterLink :to="`/recipes/${recipe.ID}`">Details</RouterLink>
      </Button>
    </CardFooter>
  </Card>
</template>
