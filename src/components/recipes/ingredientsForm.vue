<script setup lang="ts">
import { CircleMinus, CircleCheck } from 'lucide-vue-next'
import { useRecipeIngredientStore } from '@/stores/recipeIngredient'
import { useIngredientStore } from '@/stores/ingredient'
import type { Ingredient } from '@/stores/ingredient'

const recipeIngredientStore = useRecipeIngredientStore()
const ingredientStore = useIngredientStore()
const dialog = useDialogStore()
const props = defineProps({
  ingredient: Object as PropType<Ingredient>,
  editing: Boolean
})
const route = useRoute()
const name = ref()
const amount = ref()
const portion = ref()

const element = ref()
const elements = toRef(ingredientStore.ingredients)

function onSubmit() {
  if (props.ingredient.ID) {
    recipeIngredientStore.update({
      ID: props.ingredient.ID,
      Name: name.value,
      Amount: parseInt(amount.value),
      RecipeId: route.params.id,
    })
  } else {
    recipeIngredientStore.insert({
      ID: element.value.ID,
      Name: name.value,
      Amount: parseInt(amount.value),
      RecipeId: route.params.id
    })
  }
  dialog.close()
}

function remove(ingredient: Recipeingredient) {
  recipeIngredientStore.remove({
    RecipeId: route.params.id,
    ...props.ingredient,
  })
  dialog.close()
}

function handleChange(item) {
  portion.value = elements.value.find(el => el.ID == item).Portion
}
</script>

<template>
  <form @submit.prevent="onSubmit" class="grid gap-4">
    <Input id="name" :default-value="ingredient.Name" disabled v-model="name" v-if="ingredient.ID" />
    <Select v-else v-model="element" @update:modelValue="handleChange">
      <SelectTrigger>
        <SelectValue placeholder="Select an Ingredient" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectItem v-for="el in elements" :key="el.ID" :value="el.ID.toString()">
            {{ el.Name }}
          </SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
    <Input id="amount" :default-value="ingredient.Amount" v-model="amount" class="md:basis-1/4" />
    <Input id="portion" :default-value="ingredient.Portion" v-model="portion" disabled class="md:basis-1/3" />
    <Separator class="mt-2" />
    <Button type="submit">
      Save
    </Button>
    <Button variant="destructive" type="button" @click="remove(ingredient)" v-if="ingredient.ID">
      Remove
    </Button>
  </form>
</template>

<style scoped></style>
