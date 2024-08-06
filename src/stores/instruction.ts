import { ref, type Ref } from 'vue'
import { defineStore } from 'pinia'
import { goFetch } from '@/composables/goFetch'

export interface Instruction {
  ID?: number
  Content?: string
  RecipeId?: number
  Position?: number
}

interface updatePosition {
  RecipeId?: number
  Updates: Instruction[]
}

export const useInstructionStore = defineStore('instruction', () => {
  const instruction: Ref<Instruction> = ref({})
  const instructions: Ref<Instruction[]> = ref([])

  async function list(id: number) {
    const { data } = await goFetch(`/recipes/${id}/instructions`, {})

    instructions.value = data as Array<any>
  }

  async function upsert(inst: Instruction) {
    if (inst.ID) {
      // update
      const { data } = await goFetch(`/recipes/${inst.RecipeId}/instructions/${inst.ID}`, {
        method: 'PATCH',
        body: inst
      })

      const indexOf = instructions.value.findIndex((el: Instruction) => el.ID == inst.ID)

      instructions.value[indexOf] = data
    } else {
      //insert
      const { data } = await goFetch(`/recipes/${inst.RecipeId}/instructions`, {
        method: 'POST',
        body: inst
      })

      instructions.value.push(data)
    }
  }

  async function order(payload: updatePosition) {
    await goFetch(`/recipes/${payload.RecipeId}/instructions/position`, {
      method: 'PATCH',
      body: payload
    })
  }

  async function remove(instruction: Instruction) {
    await goFetch(`/recipes/${instruction.RecipeId}/instructions/${instruction.ID}`, {
      method: 'DELETE'
    })

    instructions.value = instructions.value.filter((el) => el.ID != instruction.ID)
  }

  return { instruction, instructions, list, upsert, order, remove }
})
