<script setup lang="ts">
import draggable from 'vuedraggable'
import { Grip, CirclePlus, Pencil } from 'lucide-vue-next'
import { useInstructionStore } from '@/stores/instruction'

const instructionStore = useInstructionStore()
const dialog = useDialogStore()
const route = useRoute()
const adding = ref(false)
const drag = ref(false)
const instructions = toRef(instructionStore.instructions)

instructionStore.$subscribe((_, state) => {
  instructions.value = state.instructions
})

function saveOrder() {
  const payload = instructions.value.map((el, index) => {
    return { Position: index, ID: el.ID }
  })
  instructionStore.order({
    RecipeId: route.params.id,
    Updates: payload
  })
}
</script>

<template>
  <Card class="xl:w-[600px]">
    <CardHeader>
      <div class="flex justify-between items-center">
        <CardTitle>Instructions</CardTitle>
        <ResourcesUpsert title="New Instruction"
          description="Add the new instruction here. Click save when you're done.">
          <template #trigger>
            <Button class="text-green-700 hover:text-green-500" variant="ghost" size="icon">
              <CirclePlus />
            </Button>
          </template>
          <template #content>
            <RecipesInstructionsForm :instruction="{}" />
          </template>
        </ResourcesUpsert>
      </div>
    </CardHeader>
    <CardContent>
      <Separator class="my-4" v-if="adding" />
      <draggable v-model="instructions" @start="drag = true" @end="drag = false" item-key="id" handle=".handle"
        class="space-y-2">
        <template #item="{ element }">
          <div class="flex flex-row items-center gap-1 handle">
            <Button variant="outline" size="icon" as="div" class="cursor-grab">
              <Grip class="size-4" />
            </Button>
            <div class="w-full">
              <div class="flex w-full items-center justify-between">
                <div class="basis-4/5">
                  {{ element.Content }}
                </div>
                <ResourcesUpsert title="Edit Instruction"
                  description="Make changes to the instruction here. Click save when you're done.">
                  <template #trigger>
                    <Button variant="outline" size="icon" @click="dialog.open()">
                      <Pencil class="size-4" />
                    </Button>
                  </template>
                  <template #content>
                    <RecipesInstructionsForm :instruction="element" />
                  </template>
                </ResourcesUpsert>
              </div>
            </div>
          </div>
        </template>
      </draggable>
    </CardContent>
    <CardFooter class="justify-end">
      <Button @click="saveOrder">Save Order</Button>
    </CardFooter>
  </Card>
</template>
