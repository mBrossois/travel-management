<template>
  <div>
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>

    <div v-if="getAlerts.length > 0" class="fixed max-w-72 bottom-4 left-1/2 -translate-x-2/4 flex flex-col-reverse">
      <alert v-for="alert in getAlerts" :key="alert.id" :text="alert.message" :type="alert.type" :animationState="alert.animationState"></alert>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useAlertsStore } from '~/store/alerts'

const alertStore = useAlertsStore()
const { getAlerts } = storeToRefs(alertStore)

</script>