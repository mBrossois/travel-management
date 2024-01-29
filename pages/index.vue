<template>
    <div class="pt-4">
        <h2 class="text-xl mb-2">This is the internal management tool</h2>
        <NuxtLink v-for="item in menuItems" :to="item.to" class="btn btn-black btn-home my-8">
            <div class="group rounded relative flex justify-center items-center w-full h-full overflow-hidden hover:outline-2">
                <img lazy :src="item.imgSrc" :alt="item.imgAlt" height="512" width="512" class="absolute z-10">
                <div class="absolute bg-black opacity-40 backdrop-blur-5 h-full w-full z-20 group-hover:opacity-20"></div>
                <span class="text-5xl z-30">
                    {{ item.title }}
                </span>
            </div>
        </NuxtLink>
    </div>
</template>

<script setup lang="ts">
import travelImg from '~/assets/img/travels.png'
import bookingImg from '~/assets/img/bookings.png'

const menuItems = [
    { title: 'Travels', imgSrc: travelImg, imgAlt: 'A plane flying towards a beautiful location in the sunset', to: 'travels'},
    { title: 'Bookings', imgSrc: bookingImg, imgAlt: 'Sitting with a notepad and coffee in the sun', to: 'bookings'}
]
</script>