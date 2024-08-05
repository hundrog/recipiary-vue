<script setup lang="ts">
const props = defineProps(["ingredients"])
</script>

<template>
  <div class="mx-auto max-w-screen-2xl">
    <div v-for="ingredient in ingredients" :key="ingredient.id">
      <ingredientsItem :ingredient="ingredient" />
    </div>
  </div>
</template>
