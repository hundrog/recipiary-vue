<script setup lang="ts">
import { RouterView, useRoute } from 'vue-router'
import Default from './components/layout/default.vue'
import Blank from './components/layout/blank.vue'

const route = useRoute()
</script>

<template>
  <Blank v-if="route.name === 'auth'">
    <RouterView />
  </Blank>
  <Default v-else>
    <RouterView />
  </Default>
</template>
