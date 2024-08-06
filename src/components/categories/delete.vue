<script setup lang="ts">
import { Button } from '@/components/ui/button'

const props = defineProps(['categoryID'])
function remove() {
  console.log('Deleting category', props.categoryID)
}
</script>

<template>
  <Button @click="remove">Continue</Button>
</template>
