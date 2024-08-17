import { ref, h } from 'vue'
import type { Schedule } from '@/stores/schedule'
import type { ColumnDef } from '@tanstack/vue-table'
import { useDateFormat } from '@vueuse/core'
import { Button } from '@/components/ui/button'
import { RouterLink } from 'vue-router'

const dateFormat = ref('YYYY-MM-DD')

export const columns: ColumnDef<Schedule>[] = [
  {
    accessorKey: 'StartDate',
    header: () => h('div', { class: 'text-left' }, 'Start Date'),
    cell: ({ row }) => {
      const startDate = Number.parseFloat(row.getValue('StartDate'))
      const formatted = useDateFormat(startDate.toString(), dateFormat).value

      return h('div', { class: 'text-left font-medium' }, formatted)
    },
  },
  {
    accessorKey: 'FinalDate',
    header: () => h('div', { class: 'text-left' }, 'Finish Date'),
    cell: ({ row }) => {
      const finalDate = Number.parseFloat(row.getValue('FinalDate'))
      const formatted = useDateFormat(finalDate.toString(), dateFormat).value

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
