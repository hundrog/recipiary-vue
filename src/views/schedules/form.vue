<script setup lang="ts">
import { type Ref, ref } from 'vue'
import { CalendarDate } from '@internationalized/date'

import type { DateRange } from 'radix-vue'
import { RangeCalendar } from '@/components/ui/range-calendar'
import { Button } from '@/components/ui/button'

const value = ref({
  start: new CalendarDate(2022, 1, 20),
  end: new CalendarDate(2022, 1, 20).add({ days: 20 }),
}) as Ref<DateRange>
</script>

<template>
  <div class="w-full grid gap-4">
    <RangeCalendar v-model="value" initial-focus :number-of-months="1"
      @update:start-value="(startDate) => value.start = startDate" />
    <Button>Save</Button>
  </div>
</template>
