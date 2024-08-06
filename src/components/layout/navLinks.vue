<script setup lang="ts">
import { Home, Package, Package2, Waypoints, BookHeart } from 'lucide-vue-next'
</script>

<template>
  <nav class="grid gap-2 text-lg font-medium md:gap-0 md:items-start md:text-sm md:px-4">
    <RouterLink to="#" class="flex items-center gap-2 text-lg font-semibold md:hidden">
      <Package2 class="h-6 w-6" />
      <span class="">Meal Planner</span>
    </RouterLink>
    <RouterLink to="/" class="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 hover:text-foreground"
      activeClass="bg-muted text-primary hover:text-primary">
      <Home class="h-5 w-5" />
      Dashboard
    </RouterLink>
    <RouterLink to="/categories"
      class="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 hover:text-foreground"
      activeClass="bg-muted text-primary hover:text-primary">
      <Waypoints class="h-5 w-5" />
      Categories
    </RouterLink>
    <RouterLink to="/ingredients"
      class="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 hover:text-foreground"
      activeClass="bg-muted text-primary hover:text-primary">
      <Package class="h-5 w-5" />
      Ingredients
    </RouterLink>
    <RouterLink to="/recipes" class="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 hover:text-foreground"
      activeClass="bg-muted text-primary hover:text-primary">
      <BookHeart class="h-5 w-5" />
      Recipes
    </RouterLink>
  </nav>
</template>

<style scoped></style>
