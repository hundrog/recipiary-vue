<script setup lang="ts">
import { CircleArrowLeft } from 'lucide-vue-next'
import { Button } from '@/components/ui/button'
import { computed } from 'vue'
const props = defineProps({
  route: String,
  justify: String
})

const justifyTo = computed(() => `justify-${props.justify}`)
</script>

<template>
  <div class="flex my-4" :class="[justifyTo]">
    <Button as-child class="gap-2">
      <RouterLink :to="route">
        <CircleArrowLeft />
        Back
      </RouterLink>
    </Button>
  </div>
</template>

<style scoped></style>
