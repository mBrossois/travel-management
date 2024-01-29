<template>
    <img loading="lazy" :src="cloudinaryLink" :height="height" :width="width" :alt="alt">
</template>

<script setup lang="ts">
const props = defineProps({
    name: String,
    alt: String,
    height: Number,
    width: Number
})

const cloudinaryLink = `https://res.cloudinary.com/dt7uhy7jv/image/upload/v1705741937/Travel%20app/${props.name}`

</script>