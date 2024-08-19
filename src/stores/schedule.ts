import { ref, type Ref } from 'vue'
import { defineStore } from 'pinia'
import { goFetch } from '@/composables/goFetch'
import { useRouter } from 'vue-router'
import type { Recipe } from './recipe'

export interface Schedule {
  ID?: string
  StartDate?: string
  FinalDate?: string
  Recipes?: Recipe[]
}

export interface ScheduleRecipeInput {
  ScheduleID?: number
  RecipeID?: number
}

export const useScheduleStore = defineStore('schedule', () => {
  const schedule: Ref<Schedule> = ref({})
  const schedules: Ref<Schedule[]> = ref([])
  const router = useRouter()

  async function list() {
    const { data } = await goFetch('/schedules')

    schedules.value = data
  }

  async function get(id: number) {
    const { data } = await goFetch(`/schedules/${id}`)

    schedule.value = data
  }

  async function upsert(payload: Schedule) {
    if (payload.ID) {
      const { data } = await goFetch(`/schedules/${payload.ID}`, {
        method: 'PATCH',
        body: payload
      })

      const indexOf = schedules.value.findIndex((el: Schedule) => el.ID == payload.ID)

      schedules.value[indexOf] = Object.assign({}, schedules.value[indexOf], data)
    } else {
      const { data } = await goFetch('/schedules', {
        method: 'POST',
        body: payload
      })

      schedules.value.push(data)
      console.log(data)
      router.push(`/schedules/${data.ID}`)
    }
  }

  async function remove(payload: Schedule) {
    await goFetch(`/recipes/${payload.ID}/schedules`, {
      method: 'DELETE'
    })

    schedules.value = schedules.value.filter((el) => el.ID != payload.ID)
  }

  async function addRecipe(payload: ScheduleRecipeInput) {
    const { data } = await goFetch(`/schedules/${payload.ScheduleID}/recipes`, {
      method: 'POST',
      body: {
        RecipeIDs: [payload.RecipeID]
      }
    })

    const concatRecipes = Array.from(new Set(schedule.value.Recipes?.concat(data.Recipes)))
    schedule.value.Recipes = concatRecipes
  }

  async function removeRecipe(payload: ScheduleRecipeInput) {
    await goFetch(`/schedules/${payload.ScheduleID}/recipes`, {
      method: 'DELETE',
      body: {
        RecipeIDs: [payload.RecipeID]
      }
    })

    const filteredRecipes = schedule.value.Recipes?.filter((recipe) => recipe.ID !== payload.RecipeID) || []
    schedule.value.Recipes = filteredRecipes
  }

  return { schedule, schedules, list, get, upsert, remove, addRecipe, removeRecipe }
})
