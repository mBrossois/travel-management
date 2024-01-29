<template>
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
        <!-- !Font Awesome Free 6.5.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc. -->
        <path :class="{'rotate-90': orientation === OrientationEnum.right, 'rotate-[270deg]': orientation === OrientationEnum.left, 'rotate-180': orientation === OrientationEnum.down, 'rotate-0': orientation === OrientationEnum.up,}" class="origin-center transition-transform" d="M233.4 105.4c12.5-12.5 32.8-12.5 45.3 0l192 192c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L256 173.3 86.6 342.6c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3l192-192z"/>
    </svg>
</template>

<script setup lang="ts">
import { OrientationEnum, type Orientations } from '~/types';

defineProps<{
    orientation: Orientations
}>()

</script>