<script setup lang="ts">
import { ref } from 'vue'
import { Moon, Sun } from 'lucide-vue-next'
import { Switch } from '@/components/ui/switch'
import { useColorMode } from '@vueuse/core'

const colorMode = useColorMode()
const checked = ref(colorMode.value == 'dark')

function handleChange(val) {
  val ? colorMode.value = 'dark' : colorMode.value = 'light'
}
</script>

<template>
  <div class="flex space-x-2 px-2 py-2">
    <Switch @update:checked="handleChange" :defaultChecked="checked" />
    <Moon class="size-4" />
  </div>
</template>
