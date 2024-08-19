import { ref } from 'vue'
import { useDateFormat, useNow } from '@vueuse/core'

const dateFormat = ref('YYYY-MM-DD')
const timeFormat = ref('THH:mm:ssZ')
const getTime = () => useDateFormat(String(useNow().value), timeFormat).value

export const formatDate = (date: string) => useDateFormat(date, dateFormat).value
export const formatDateTime = (date: string) => formatDate(date) + getTime()



