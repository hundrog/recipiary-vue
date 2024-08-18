import { h } from 'vue'
import type { Category } from '@/stores/category'
import { useDialogStore } from '@/stores/dialog'
import type { ColumnDef } from '@tanstack/vue-table'
import { Button } from '@/components/ui/button'
import CategoriesForm from './form.vue'
import ResourcesUpsert from '@/components/resources/upsert.vue'
import { Pencil } from 'lucide-vue-next'

const dialog = useDialogStore()
const colorClass = (color: string) => {
  return color ? `bg-${color}-600 dark:bg-${color}-400` : 'bg-muted-foreground'
}

export const columns: ColumnDef<Category>[] = [
  {
    accessorKey: 'Name',
    header: () => h('div', { class: 'text-left' }, 'Name'),
    cell: ({ row }) => {
      const name = row.getValue('Name')
      const formatted = String(name)

      return h('div', { class: 'text-left font-medium' }, formatted)
    },
  },
  {
    accessorKey: 'Color',
    header: () => h('div', { class: 'text-center max-w-32' }, 'Category'),
    cell: ({ row }) => {
      const color = row.getValue('Color')
      const formatted = colorClass(String(color))

      return h('div', { class: `max-w-32 rounded-full py-3 ${formatted}` })
    },
  },
  {
    id: 'actions',
    enableHiding: false,
    cell: ({ row }) => {
      const category = row.original

      return h('div', { class: 'text-right' },
        h(ResourcesUpsert, {
          title: "Edit category",
          description: "Make changes to your category here. Click save when you're done."
        }, {
          trigger: () => h(Button, {
            onClick: dialog.open(),
            variant: 'outline',
            size: 'icon'
          }, () => h(Pencil, { class: 'size-4' })),

          content: () => h(CategoriesForm, { category })
        }))
    }
  },
]


