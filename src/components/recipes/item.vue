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
import { useRoute } from 'vue-router';
import { useScheduleStore } from '@/stores/schedule'

const params = defineProps(['recipe'])
const route = useRoute()
const scheduleStore = useScheduleStore()

async function removeRecipe() {
  //TODO
  scheduleStore.removeRecipe({
    ScheduleID: Number(route.params.id),
    RecipeID: Number(params.recipe.ID)
  })
}
</script>

<template>
  <Card class="">
    <CardHeader>
      <img class="mb-2" :src="recipe.ImageUrl" />
      <CardTitle>{{ recipe.Name }}</CardTitle>
      <CardDescription>{{ recipe.Description }}</CardDescription>
    </CardHeader>
    <CardContent class="flex flex-wrap">
      <Badge variant="secondary" v-for="ingredient in recipe.Ingredients" :key="ingredient.ID" class="mt-2 mx-0.5">
        {{ ingredient.Name }}
      </Badge>
    </CardContent>
    <CardFooter class="grid" v-if="route.name == 'show_schedule'">
      <Button v-if="route.name == 'show_schedule'" @click="removeRecipe">Remove from Schedule</Button>
    </CardFooter>
    <CardFooter class="justify-end" v-else>
      <Button as-child>
        <RouterLink :to="`/recipes/${recipe.ID}`">Details</RouterLink>
      </Button>
    </CardFooter>
  </Card>
</template>
