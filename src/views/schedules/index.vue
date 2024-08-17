<script setup lang="ts">
import { useDialogStore, } from '@/stores/dialog'
import { useScheduleStore, type Schedule } from '@/stores/schedule'
import { onMounted, ref } from 'vue'
import ResourcesUpsert from '@/components/resources/upsert.vue'
import SchedulesForm from '@/components/schedules/form.vue'
import { Button } from '@/components/ui/button'
import { columns } from '@/components/schedules/columns'
import { DataTable } from '@/components/ui/data-table'

const dialog = useDialogStore()
const scheduleStore = useScheduleStore()
const data = ref<Schedule[]>([])

function openModal() {
  dialog.open()
}

onMounted(async () => {
  await scheduleStore.list()
  data.value = scheduleStore.schedules
})
</script>

<template>
  <div class="flex justify-between">
    <h1 class="text-lg font-semibold md:text-2xl">Schedules</h1>
    <ResourcesUpsert title="New Schedule" description="Create your new schedule here. Click save when you're done."
      v-if="scheduleStore.schedules.length > 0">
      <template #trigger>
        <Button @click="openModal"> Add Schedule </Button>
      </template>
      <template #content>
        <SchedulesForm />
      </template>
    </ResourcesUpsert>
  </div>
  <div v-if="scheduleStore.schedules.length > 0">
    <DataTable :columns="columns" :data="data" />
  </div>
  <div class="flex flex-1 items-center justify-center rounded-lg border border-dashed shadow-sm" v-else>
    <div class="flex flex-col items-center gap-1 text-center">
      <h3 class="text-2xl font-bold tracking-tight">You have no schedules</h3>
      <ResourcesUpsert title="New Schedule" description="Create your new schedule here. Click save when you're done.">
        <template #trigger>
          <Button @click="openModal"> Add Schedule </Button>
        </template>
        <template #content>
          <SchedulesForm />
        </template>
      </ResourcesUpsert>
    </div>
  </div>
</template>

<style scoped></style>
