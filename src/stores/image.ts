import { ref, type Ref } from 'vue'
import { defineStore } from 'pinia'
import { goFetch } from '@/composables/goFetch'

export interface Uris {
  regular: string
  small: string
}

export interface Image {
  id?: string
  alt_description?: string
  urls?: Uris
}

export interface SearchQuery {
  Page: number
  Size: number
  Search: string
}

export const useImageStore = defineStore('image', () => {
  const images: Ref<Image[]> = ref([])
  const uri: Ref<string> = ref('')

  async function search(query: SearchQuery) {
    const { data } = await goFetch('/images', {
      params: {
        page: query.Page,
        size: query.Size,
        search: query.Search
      }
    })

    images.value = data.results as Array<Image>
  }

  return { images, uri, search }
})
