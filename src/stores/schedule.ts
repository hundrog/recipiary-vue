import { ref, type Ref } from 'vue'
import { defineStore } from 'pinia'
import { goFetch } from '@/composables/goFetch'

export interface Schedule {
  ID?: string
  StartDate?: string
  FinalDate?: string
}

export const useScheduleStore = defineStore('schedule', () => {
  const schedules: Ref<Schedule[]> = ref([])

  async function list() {
    const { data } = await goFetch('/schedules')

    schedules.value = data
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
      const { data } = await goFetch('/schedules/', {
        method: 'POST',
        body: payload
      })

      schedules.value.push(data)
    }
  }

  async function remove(payload: Schedule) {
    await goFetch(`/recipes/${payload.ID}/schedules/`, {
      method: 'DELETE'
    })

    schedules.value = schedules.value.filter((el) => el.ID != payload.ID)
  }

  return { schedules, list, upsert, remove }
})
