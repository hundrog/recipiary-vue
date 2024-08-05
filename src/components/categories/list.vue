<script setup lang="ts">
import CategoriesItem from './item.vue'
const props = defineProps(["categories"])
</script>

<template>
  <div class="mx-auto max-w-screen-2xl">
    <div v-for="category in categories" :key="category.id">
      <CategoriesItem :category="category" />
    </div>
  </div>
</template>

<style scoped></style>
