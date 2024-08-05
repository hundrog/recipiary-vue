<script setup lang="ts">
const props = defineProps(["recipes"])
</script>

<template>
  <div class="flex items-center">
    <h1 class="text-lg font-semibold md:text-2xl">
      Dashboard
    </h1>
  </div>
  <div v-if="recipes">

  </div>
  <div class="flex flex-1 items-center justify-center rounded-lg border border-dashed shadow-sm">
    <div class="flex flex-col items-center gap-1 text-center">
    </div>
  </div>
</template>

<style scoped></style>
