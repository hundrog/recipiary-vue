<script setup lang="ts">
const props = defineProps({
  instruction: Object as PropType<Instruction>,
  editing: Boolean,
  position: Number
})
const instructionStore = useInstructionStore()
const dialog = useDialogStore()
const route = useRoute()
const content = ref(props.instruction.Content)
const position = toRef()

function onSubmit() {
  instructionStore.upsert({
    ID: props.instruction.ID,
    Content: content.value,
    RecipeId: route.params.id,
    Position: props.position
  })
  dialog.close()
}

function remove() {
  instructionStore.remove({
    RecipeId: route.params.id,
    ID: props.instruction.ID
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
    <Button type="button" variant="outline" @click="remove()" v-if="instruction.ID">Delete</Button>
  </form>
</template>
