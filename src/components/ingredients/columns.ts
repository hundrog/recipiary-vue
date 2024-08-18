import { h } from 'vue'
import type { Ingredient } from '@/stores/ingredient'
import { useDialogStore } from '@/stores/dialog'
import type { ColumnDef } from '@tanstack/vue-table'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import IngredientsForm from './form.vue'
import ResourcesUpsert from '@/components/resources/upsert.vue'
import { Pencil } from 'lucide-vue-next'

const dialog = useDialogStore()
const colorClass = (color: string) => {
  return color ? `text-${color}-600 dark:text-${color}-400` : 'text-muted-foreground'
}

export const columns: ColumnDef<Ingredient>[] = [
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
    accessorKey: 'Portion',
    header: () => h('div', { class: 'text-left' }, 'Portion'),
    cell: ({ row }) => {
      const portion = row.getValue('Portion')
      const formatted = String(portion)

      return h('div', { class: 'text-left font-medium' }, formatted)
    },
  },
  {
    accessorKey: 'CategoryId',
    header: () => h('div', { class: 'text-center max-w-32' }, 'Category'),
    cell: ({ row }) => {
      const ingredient = row.original
      const category = ingredient.Category
      const color = colorClass(String(category?.Color))
      const formatted = String(category?.Name)

      return h('div', { class: 'text-left font-medium max-w-32' },
        h(Badge, { variant: 'secondary', class: `justify-center w-full ${color}` }, formatted))
    },
  },
  {
    id: 'actions',
    enableHiding: false,
    cell: ({ row }) => {
      const ingredient = row.original

      return h('div', { class: 'text-right' },
        h(ResourcesUpsert, {
          title: "Edit ingredient",
          description: "Make changes to your ingredient here. Click save when you're done."
        }, {
          trigger: () => h(Button, {
            onClick: dialog.open(),
            variant: 'outline',
            size: 'icon'
          }, () => h(Pencil, { class: 'size-4' })),

          content: () => h(IngredientsForm, { ingredient })
        }))
    }
  },
]

