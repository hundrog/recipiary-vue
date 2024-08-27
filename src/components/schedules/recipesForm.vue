<script setup lang="ts">
import { onMounted } from 'vue'
import { useDialogStore } from '@/stores/dialog'
import { useRecipeStore } from '@/stores/recipe'
import { useScheduleStore } from '@/stores/schedule'
import { Checkbox } from '@/components/ui/checkbox'
import { Button } from '@/components/ui/button'
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import * as z from 'zod'
import { useRoute } from 'vue-router';

const props = defineProps(['scheduleRecipes'])
const route = useRoute()
const recipeStore = useRecipeStore()
const scheduleStore = useScheduleStore()
const dialog = useDialogStore()

const formSchema = toTypedSchema(z.object({
  items: z.array(z.number()).refine(value => value.some(item => item), {
    message: 'You have to select at least one item.',
  }),
}))

const { handleSubmit } = useForm({
  validationSchema: formSchema,
  initialValues: {
    items: props.scheduleRecipes,
  },
})

const onSubmit = handleSubmit((values) => {
  // console.log(values)
  scheduleStore.updateRecipes({
    ScheduleID: route.params.id,
    RecipeIDs: values.items,
  })

  dialog.close()
})

onMounted(async () => {
  await recipeStore.list()
})
</script>

<template>
  <form @submit="onSubmit">
    <FormField name="items">
      <FormItem>
        <FormField v-for="item in recipeStore.recipes" v-slot="{ value, handleChange }" :key="item.ID" type="checkbox"
          :value="item.ID" :unchecked-value="false" name="items">
          <FormItem class="flex flex-row items-start space-x-3 space-y-0">
            <FormControl>
              <Checkbox :checked="value.includes(item.ID)" @update:checked="handleChange" />
            </FormControl>
            <FormLabel class="font-normal">
              {{ item.Name }}
            </FormLabel>
          </FormItem>
        </FormField>
        <FormMessage />
      </FormItem>
    </FormField>

    <div class="grid mt-4">
      <Button type="submit">
        Submit
      </Button>
    </div>
  </form>
</template>
