<template>
    <div
    :class="{
        'bg-blue-100 text-blue-600': type === AlertTypeEnum.info,
        'bg-red-100 text-red-600': type === AlertTypeEnum.error,
        'bg-orange-100 text-orange-600': type === AlertTypeEnum.warn,
        'animate-appear': animationState === AlertAnimationStateEnum.appear,
        'animate-dissappear': animationState === AlertAnimationStateEnum.dissapear,
        }"
    class="mb-4 rounded-lg px-6 py-5 text-base"
    role="alert">
    {{ text }}
    </div>
</template>

<script setup lang="ts">
import {type AlertType, AlertTypeEnum, AlertAnimationStateEnum} from '~/types'
defineProps<{
    text: string,
    type: AlertType,
    animationState: AlertAnimationStateEnum.appear | AlertAnimationStateEnum.dissapear
}>()

</script>