import { ref, type Ref } from 'vue'
import { defineStore } from 'pinia'
import { goFetch } from '@/composables/goFetch'

export interface Category {
  ID?: number,
  Name?: string,
  Color?: string
}

export const useCategoryStore = defineStore('category', () => {
  const category: Ref<Category> = ref({})
  const categories: Ref<Category[]> = ref([])

  async function find(id: number) {
    const { data } = await goFetch(`/categories/${id}`, {})

    category.value = data
    return category
  }

  async function list() {
    const { data } = await goFetch('/categories', {})

    categories.value = data as Array<any>
  }

  async function upsert(cat: Category) {
    if (cat.ID) {
      // update
      const { data } = await goFetch(`/categories/${cat.ID}`, {
        method: 'PATCH',
        body: cat
      })

      const indexOf = categories.value.findIndex((el: Category) => el.ID == cat.ID)
      categories.value[indexOf] = data
    } else {
      //insert
      const { data } = await goFetch('/categories', {
        method: 'POST',
        body: cat
      })

      categories.value.push(data)
    }
  }

  return { category, categories, find, list, upsert }
})
