import { ref, type Ref } from 'vue'
import { defineStore } from 'pinia'
import { goFetch } from '@/composables/goFetch'
import { useRouter } from 'vue-router'

export interface Recipe {
  ID?: number
  Name?: string
  Description?: string
  ImageUrl?: string
}

export const useRecipeStore = defineStore('recipe', () => {
  const recipe: Ref<Recipe> = ref({})
  const recipes: Ref<Recipe[]> = ref([])
  const router = useRouter()

  async function list() {
    const { data } = await goFetch('/recipes', {})

    recipes.value = data as Array<any>
  }

  async function get(id: number) {
    const { data } = await goFetch(`/recipes/${id}`, {})

    recipe.value = data
  }

  async function upsert(payload: Recipe) {
    if (payload.ID) {
      // update
      const { data } = await goFetch(`/recipes/${payload.ID}`, {
        method: 'PATCH',
        body: payload
      })

      const indexOf = recipes.value.findIndex((el: Recipe) => el.ID == payload.ID)

      recipes.value[indexOf] = data
    } else {
      //insert
      const { data } = await goFetch('/recipes', {
        method: 'POST',
        body: payload
      })

      recipes.value.push(data)
      router.replace(`/recipes/${data.ID}`)
    }
  }

  return { recipe, recipes, get, list, upsert }
})
