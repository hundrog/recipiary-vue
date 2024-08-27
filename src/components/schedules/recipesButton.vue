<script setup lang="ts">
import { ref } from 'vue'
import { useRoute } from 'vue-router';
import { useDialogStore } from '@/stores/dialog'
import { useScheduleStore } from '@/stores/schedule'
import { useMediaQuery } from '@vueuse/core'
import { CircleFadingPlus } from 'lucide-vue-next';
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import ResourcesUpsert from '@/components/resources/upsert.vue'
import SchedulesRecipesForm from './recipesForm.vue'

const dialog = useDialogStore()
const scheduleStore = useScheduleStore()
const isDesktop = useMediaQuery('(min-width: 768px)')

const route = useRoute()
const scheduleRecipes = ref()

scheduleStore.$subscribe((_, state) => {
  scheduleRecipes.value = state.schedule.Recipes?.map(r => r.ID)
})
</script>

<template>
  <ResourcesUpsert v-if="route.name == 'show_schedule'" title="Select recipes"
    description="Select the recipes to add here. Click save when you're done.">
    <template #trigger>
      <!-- <Card -->
      <!--   class="h-96 flex items-center justify-center cursor-pointer transition ease-in-out hover:border-primary hover:text-primary duration-50" -->
      <!--   @click="dialog.open()" v-if="isDesktop"> -->
      <!--   <CircleFadingPlus class="size-32" :stroke-width="1" /> -->
      <!-- </Card> -->
      <Button @click="dialog.open()">Change Recipes</Button>
    </template>
    <template #content>
      <SchedulesRecipesForm :scheduleRecipes="scheduleRecipes" />
    </template>
  </ResourcesUpsert>
</template>
