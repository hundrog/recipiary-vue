import { ref, h } from 'vue'
import type { Schedule } from '@/stores/schedule'
import type { ColumnDef } from '@tanstack/vue-table'
import { useDateFormat } from '@vueuse/core'
import DropdownAction from '@/components/schedules/data_table_dropdown.vue'

const dateFormat = ref('YYYY-MM-DD')

export const columns: ColumnDef<Schedule>[] = [
  // {
  //   accessorKey: 'ID',
  //   header: () => h('div', { class: 'text-right' }, 'ID'),
  //   cell: ({ row }) => {
  //     const id = Number.parseFloat(row.getValue('ID'))
  //     const formatted = id
  //
  //     return h('div', { class: 'text-right font-medium' }, formatted)
  //   },
  // },
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
    id: 'actions',
    enableHiding: false,
    cell: ({ row }) => {
      const schedule = row.original

      return h('div', { class: 'relative text-right' }, h(DropdownAction, {
        schedule
      }))
    },
  },
]
