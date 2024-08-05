import { ref } from 'vue'
import { defineStore } from 'pinia'

export interface Recipe {
  ID?: number,
  Name?: string,
  Description?: string,
  ImageUrl?: string,
}

export const useRecipeStore = defineStore('recipe', () => {
  const recipe: Ref<Recipe> = ref({})
  const recipes: Ref<Recipe[]> = ref([])

  async function list() {
    const { data } = await goFetch('/recipes', {})

    recipes.value = data as Array<any>
  }

  async function get(id: number) {
    const { data } = await goFetch(`/recipes/${id}`, {})

    recipe.value = data
  }

  async function upsert(recipe: Recipe) {
    if (recipe.ID) {
      // update
      const { data } = await goFetch(`/recipes/${recipe.ID}`, {
        method: 'PATCH',
        body: recipe
      })

      const indexOf = recipes.value.findIndex((el: Recipe) => el.ID == recipe.ID)

      recipes.value[indexOf] = data
    } else {
      //insert
      const { data } = await goFetch('/recipes', {
        method: 'POST',
        body: recipe
      })

      recipes.value.push(data)
    }
  }

  return { recipe, recipes, get, list, upsert }
})
