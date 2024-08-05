<script lang="ts" setup>
import { ref } from 'vue'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { useDialogStore } from '@/stores/dialog'
import { useCategoryStore } from '@/stores/category'

const dialog = useDialogStore()
const categoryStore = useCategoryStore()

const props = defineProps(["category"])
const colors = ["slate", "gray", "zinc", "neutral", "stone", "red", "orange", "amber", "yellow", "lime", "green", "emerald", "teal", "cyan", "sky", "blue", "indigo", "violet", "purple", "fuchsia", "pink", "rose"]

const name = ref()
const color = ref()

function onSubmit() {
  categoryStore.upsert({
    ID: props.category.ID,
    Name: name.value,
    Color: color.value
  })

  dialog.close()
}
</script>

<template>
  <form class="grid items-start gap-4" @submit.prevent="onSubmit">
    <div class="grid gap-2">
      <Label html-for="name">Name</Label>
      <Input id="name" :default-value="category.Name" v-model="name" />
    </div>
    <div class="grid gap-2">
      <Label html-for="Color">Color</Label>
      <Select id="color" :default-Value="category.Color" v-model="color">
        <SelectTrigger class="">
          <SelectValue placeholder="Select a Color" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Colors</SelectLabel>
            <SelectItem v-for="color in colors" :value="color" :key="color">
              <div class="flex">
                <div class="px-6 py-2 mx-2 rounded-md" :class="[`bg-${color}-400`]"></div>
                {{ color }}
              </div>
            </SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
    <Button type="submit">
      Save changes
    </Button>
    <Button type="button" variant="outline" v-if="category.ID">
      Delete
    </Button>
  </form>
</template>
