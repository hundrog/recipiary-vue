<script setup lang="ts">
import { useRoute } from 'vue-router'
import { useDialogStore } from '@/stores/dialog'
import { useInstructionStore, type Instruction } from '@/stores/instruction'
import { ref, type PropType } from 'vue'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'

const props = defineProps(['instruction', 'position'])
const instructionStore = useInstructionStore()
const dialog = useDialogStore()
const route = useRoute()
const content = ref(props.instruction?.Content)
const recipeId = Number(route.params.id)

function onSubmit() {
  instructionStore.upsert({
    ID: props.instruction?.ID,
    Content: content.value,
    RecipeId: recipeId,
    Position: props.position
  })
  dialog.close()
}

function remove() {
  instructionStore.remove({
    RecipeId: recipeId,
    ID: props.instruction?.ID
  })
  dialog.close()
}
</script>

<template>
  <form @submit.prevent="onSubmit" class="grid items-start gap-4">
    <div class="grid gap-2">
      <Label html-for="Content">Instruction</Label>
      <Textarea placeholder="Type your new instruction here." v-model="content" />
    </div>
    <Button type="submit">Save</Button>
    <Button type="button" variant="outline" @click="remove()" v-if="instruction?.ID">Delete</Button>
  </form>
</template>
