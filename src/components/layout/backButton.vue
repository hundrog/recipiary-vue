<script setup lang="ts">
import { CircleArrowLeft } from 'lucide-vue-next'
const props = defineProps({
  route: String,
  justify: String
})

const justifyTo = computed(() => `justify-${props.justify}`)
</script>

<template>
  <div class="flex my-4" :class="[justifyTo]">
    <Button as-child class="gap-2">
      <NuxtLink :to="route">
        <CircleArrowLeft />
        Back
      </NuxtLink>
    </Button>
  </div>
</template>

<style scoped></style>
