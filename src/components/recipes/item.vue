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

defineProps(['recipe'])
</script>

<template>
  <Card class="h-96">
    <CardHeader>
      <img class="mb-2 h-40 object-cover" :src="recipe.ImageUrl" />
      <CardTitle>{{ recipe.Name }}</CardTitle>
      <CardDescription>{{ recipe.Description }}</CardDescription>
    </CardHeader>
    <CardContent class="flex flex-wrap mb-6">
    </CardContent>
    <CardFooter class="justify-end">
      <Button as-child>
        <RouterLink :to="`/recipes/${recipe.ID}`">Details</RouterLink>
      </Button>
    </CardFooter>
  </Card>
</template>
