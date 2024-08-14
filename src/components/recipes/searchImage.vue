<script setup lang="ts">
import { useMediaQuery } from '@vueuse/core'
import { ref } from 'vue'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Skeleton } from '@/components/ui/skeleton'
import { Check } from 'lucide-vue-next'
import { useImageStore } from '@/stores/image'

const search = ref('')
const pending = ref(false)
const imageStore = useImageStore()
const isDesktop = useMediaQuery('(min-width: 768px)')
const itemRefs = ref([])

async function searchImage() {
  pending.value = true
  await imageStore.search({
    Search: search.value,
    Page: 1,
    Size: isDesktop.value ? 8 : 6
  })
  pending.value = false
}

function handleChange(value: string) {
  imageStore.uri = value
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
  <ul class="grid grid-cols-2 gap-4">
    <li class="relative" v-for="image in imageStore.images" :key="image.id">
      <input class="sr-only peer" type="radio" :value="image.urls.regular" name="answer" :id="image.id"
        @click="handleChange(image.urls.regular)" />
      <label
        class="flex border cursor-pointer focus:outline-none hover:border-primary peer-checked:ring-ring peer-checked:ring-2 peer-checked:border-transparent"
        :for="image.id">
        <img :src="image.urls.small" alt="" class="object-cover h-44 w-full">
      </label>
      <Check class="absolute hidden peer-checked:block top-3 right-3 text-primary size-8" />
    </li>
  </ul>
</template>
