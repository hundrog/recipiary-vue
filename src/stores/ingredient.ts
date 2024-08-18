import { ref, type Ref } from 'vue'
import { defineStore } from 'pinia'
import { goFetch } from '@/composables/goFetch'
import type { Category } from './category'

export interface Ingredient {
  ID?: number
  Name?: string
  CategoryId?: number
  Portion?: string
  Category?: Category
}

export const useIngredientStore = defineStore('ingredient', () => {
  const ingredient: Ref<Ingredient> = ref({})
  const ingredients: Ref<Ingredient[]> = ref([])

  async function list() {
    const { data } = await goFetch('/ingredients', {})

    ingredients.value = data as Array<any>
  }

  async function upsert(ing: Ingredient) {
    if (ing.ID) {
      // update
      const { data } = await goFetch(`/ingredients/${ing.ID}`, {
        method: 'PATCH',
        body: ing
      })

      const indexOf = ingredients.value.findIndex((el: Ingredient) => el.ID == ing.ID)

      ingredients.value[indexOf] = data
    } else {
      //insert
      const { data } = await goFetch('/ingredients', {
        method: 'POST',
        body: ing
      })

      ingredients.value.push(data)
    }
  }

  return { ingredient, ingredients, list, upsert }
})
