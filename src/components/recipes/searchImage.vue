<script setup>
import { ref } from 'vue'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Skeleton } from '@/components/ui/skeleton'

const search = ref('')
const pending = ref(false)

async function searchImage() {
  pending.value = true
  setTimeout(() => {
    pending.value = false
  }, 5000)
}
</script>
<template>
  <form class="flex w-full tems-center gap-1.5 my-4" @submit.prevent="searchImage">
    <Input id="imageUrl" v-model="search" />
    <Button type="submit">Search image</Button>
  </form>
  <div class="grid grid-cols-2 gap-4" v-if="pending">
    <Skeleton class="w-full h-40" />
    <Skeleton class="w-full h-40" />
    <Skeleton class="w-full h-40" />
    <Skeleton class="w-full h-40" />
  </div>
  <div class="grid grid-cols-2 gap-4" v-else>
  </div>
</template>
