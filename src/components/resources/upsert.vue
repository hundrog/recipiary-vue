<script lang="ts" setup>
import { useMediaQuery } from '@vueuse/core'
import { ref, watch } from 'vue'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogScrollContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog'
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger
} from '@/components/ui/drawer'
import { useDialogStore } from '@/stores/dialog'

const store = useDialogStore()
defineProps(['title', 'description'])
const isDesktop = useMediaQuery('(min-width: 768px)')
const isOpen = ref(false)

watch(
  () => store.isOpen,
  (open) => {
    if (!open) {
      isOpen.value = open
    }
  }
)
</script>

<template>
  <Dialog v-if="isDesktop" v-model:open="isOpen">
    <DialogTrigger as-child>
      <slot name="trigger" />
    </DialogTrigger>
    <DialogScrollContent class="sm:max-w-screen-sm">
      <DialogHeader>
        <DialogTitle>{{ title }}</DialogTitle>
        <DialogDescription>
          <div>
            {{ description }}
          </div>
        </DialogDescription>
      </DialogHeader>
      <slot name="content" />
    </DialogScrollContent>
  </Dialog>

  <Drawer v-else v-model:open="isOpen">
    <DrawerTrigger as-child>
      <slot name="trigger" />
    </DrawerTrigger>
    <DrawerContent>
      <DrawerHeader class="text-left">
        <DrawerTitle>{{ title }}</DrawerTitle>
        <DrawerDescription>
          {{ description }}
        </DrawerDescription>
      </DrawerHeader>
      <div class="px-4">
        <slot name="content" />
      </div>
      <DrawerFooter class="">
        <DrawerClose as-child>
          <Button variant="outline"> Cancel </Button>
        </DrawerClose>
      </DrawerFooter>
    </DrawerContent>
  </Drawer>
</template>
