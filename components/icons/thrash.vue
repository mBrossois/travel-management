<template>
    <svg class="overflow-visible" width="25" height="25" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g>
            <path class="transition-transform" :class="{'translate-y-[-1rem]': hovered, 'rotate-6': hovered }" d="M15.5 3.125L16.2031 1.72852C16.7305 0.664063 17.8145 0 18.9961 0H30.7539C31.9355 0 33.0195 0.664063 33.5469 1.72852L34.25 3.125H43.625C45.3535 3.125 46.75 4.52148 46.75 6.25C46.75 7.97852 45.3535 9.375 43.625 9.375H6.125C4.39648 9.375 3 7.97852 3 6.25C3 4.52148 4.39648 3.125 6.125 3.125H15.5Z" fill="black"/>
            <path d="M43.625 12.5H6.125L8.19531 45.6055C8.35156 48.0762 10.4023 50 12.873 50H36.877C39.3477 50 41.3984 48.0762 41.5547 45.6055L43.625 12.5Z" fill="black"/>
        </g>
    </svg>

</template>

<script setup lang="ts">
defineProps({ hovered: Boolean })
</script>