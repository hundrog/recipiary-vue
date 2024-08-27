<script setup lang="ts">
import { CircleArrowLeft } from 'lucide-vue-next'
import { Button } from '@/components/ui/button'
import { computed } from 'vue'
import { useRouter } from 'vue-router';
const props = defineProps({
  justify: String
})

const router = useRouter()
const justifyTo = computed(() => `justify-${props.justify}`)
</script>

<template>
  <div class="flex my-4" :class="[justifyTo]">
    <Button class="gap-2" @click="router.back()">
      <CircleArrowLeft />
      Back
    </Button>
  </div>
</template>

<style scoped></style>
