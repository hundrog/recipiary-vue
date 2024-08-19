<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useScheduleStore, type Schedule } from '@/stores/schedule'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import LayoutBackButton from '@/components/layout/backButton.vue'
import { useRoute } from 'vue-router'
import RecipesList from '@/components/recipes/list.vue'
import { formatDate } from '@/composables/formatDate'

const route = useRoute()
const scheduleStore = useScheduleStore()
const scheduleId = Number(route.params.id)
const backTo = "/schedules"
const schedule = ref<Schedule>({})

onMounted(async () => {
  await scheduleStore.get(scheduleId)
})

scheduleStore.$subscribe((mutation, state) => {
  schedule.value = scheduleStore.schedule
})
</script>

<template>
  <div class="mx-auto grid w-full max-w-screen-xl">
    <LayoutBackButton :route="backTo" justify="end" />
    <Card>
      <CardHeader class="flex-row justify-between items-center">
        <div>
          <CardTitle>From {{ formatDate(String(schedule.StartDate)) }} to {{ formatDate(String(schedule.FinalDate)) }}
          </CardTitle>
          <CardDescription>You have {{ schedule?.Recipes?.length }} recipes.</CardDescription>
        </div>
        <Button>Add Recipes</Button>
      </CardHeader>
      <CardContent class="">
        <RecipesList :recipes="schedule.Recipes" />
      </CardContent>
      <CardFooter>
      </CardFooter>
    </Card>
  </div>
</template>
