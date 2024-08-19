<script setup lang="ts">
import { type Ref, ref } from 'vue'
import { CalendarDate } from '@internationalized/date'
import type { DateRange } from 'radix-vue'
import { RangeCalendar } from '@/components/ui/range-calendar'
import { Button } from '@/components/ui/button'
import { useNow, useMediaQuery } from '@vueuse/core'
import { useScheduleStore } from '@/stores/schedule'
import { formatDate, formatDateTime } from '@/composables/formatDate'

const [year, month, day] = formatDate(String(useNow().value)).split('-').map(Number)
const scheduleStore = useScheduleStore()

const value = ref({
  start: new CalendarDate(year, month, day),
  end: new CalendarDate(year, month, day).add({ days: 7 }),
}) as Ref<DateRange>

const isDesktop = useMediaQuery('(min-width: 768px)')

async function insert() {
  console.log(formatDateTime(String(value.value.start)))
  console.log(formatDateTime(String(value.value.end)))

  await scheduleStore.upsert({
    StartDate: formatDateTime(String(value.value.start)),
    FinalDate: formatDateTime(String(value.value.end))
  })
}
</script>

<template>
  <div class="w-full grid gap-4">
    <RangeCalendar v-model="value" initial-focus :number-of-months="isDesktop ? 2 : 1"
      @update:start-value="(startDate) => value.start = startDate" />
    <Button @click="insert">Save</Button>
  </div>
</template>
