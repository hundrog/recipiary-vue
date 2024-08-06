import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useDialogStore = defineStore('dialog', () => {
  const isOpen = ref(false)

  function close() {
    isOpen.value = false
  }

  function open() {
    isOpen.value = true
  }

  return { isOpen, close, open }
})
