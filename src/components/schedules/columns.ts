import { ref, h } from 'vue'
import type { Schedule } from '@/stores/schedule'
import type { ColumnDef } from '@tanstack/vue-table'
import { useDateFormat } from '@vueuse/core'
import { Button } from '@/components/ui/button'
import { RouterLink } from 'vue-router'
import { formatDate } from '@/composables/formatDate'

export const columns: ColumnDef<Schedule>[] = [
  {
    accessorKey: 'StartDate',
    header: () => h('div', { class: 'text-left' }, 'Start Date'),
    cell: ({ row }) => {
      const startDate = String(row.getValue('StartDate'))
      const formatted = formatDate(startDate)

      return h('div', { class: 'text-left font-medium' }, formatted)
    },
  },
  {
    accessorKey: 'FinalDate',
    header: () => h('div', { class: 'text-left' }, 'Finish Date'),
    cell: ({ row }) => {
      const finalDate = String(row.getValue('FinalDate'))
      const formatted = formatDate(finalDate)

      return h('div', { class: 'text-left font-medium' }, formatted)
    },
  },
  {
    id: 'edit',
    enableHiding: false,
    cell: ({ row }) => {
      const schedule = row.original

      return h('div', { class: 'relative text-right' }, h(Button, { 'as-child': true, 'variant': 'outline' }, () => h(RouterLink, {
        to: `/schedules/${schedule.ID}`
      }, () => 'Details')))
    },
  },
]
