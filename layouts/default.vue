<template>
    <div class="page-layout p-4 w-svw flex">
        <Menu></Menu>
        <div class="pl-4">
            <h1 class="capitalize text-3xl"> {{ route.name === 'index' ? 'Travel app' : route.name }} </h1>
            <Suspense>
                <slot />
            </Suspense>
        </div>
    </div>
</template>
  
<script setup lang="ts">
import { useRoute } from 'vue-router'
const route = useRoute()

</script>