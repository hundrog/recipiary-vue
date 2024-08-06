import { ref, type Ref } from 'vue'
import { defineStore } from 'pinia'
import { goFetch } from '@/composables/goFetch'

export interface RecipeIngredient {
  ID?: number
  Name?: string
  Portion?: string
  Amount?: number
  RecipeId?: number
}

export const useRecipeIngredientStore = defineStore('recipeIngredient', () => {
  const recipeIngredients: Ref<RecipeIngredient[]> = ref([])

  async function list(id: number) {
    const { data } = await goFetch(`/recipes/${id}/ingredients`, {})

    recipeIngredients.value = data as RecipeIngredient[]
  }

  async function insert(ingredient: RecipeIngredient) {
    const { data } = await goFetch(`/recipes/${ingredient.RecipeId}/ingredients`, {
      method: 'POST',
      body: ingredient
    })

    recipeIngredients.value.push(data as RecipeIngredient)
  }

  async function update(ingredient: RecipeIngredient) {
    const { data } = await goFetch(`/recipes/${ingredient.RecipeId}/ingredients/${ingredient.ID}`, {
      method: 'PATCH',
      body: ingredient
    })

    const indexOf = recipeIngredients.value.findIndex(
      (el: RecipeIngredient) => el.ID == ingredient.ID
    )
    recipeIngredients.value[indexOf] = data as RecipeIngredient
  }

  async function remove(ingredient: RecipeIngredient) {
    await goFetch(`/recipes/${ingredient.RecipeId}/ingredients/${ingredient.ID}`, {
      method: 'DELETE'
    })

    recipeIngredients.value = recipeIngredients.value.filter((el) => {
      return el.ID != ingredient.ID
    })
  }

  return { recipeIngredients, list, insert, update, remove }
})
