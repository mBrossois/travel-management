<template>
    <header class="sticky top-4 h-full-min-pad w-24 bg-black text-white flex flex-col rounded p-1 items-center fill-white">
        <NuxtLink to="/" class="mb-24 mt-4 flex justify-center w-24"><img src="/logo_flight-app.svg" height="75" width="75" alt="Logo travel app"/></NuxtLink>
        <nav>
            <NuxtLink v-for="navItem in navItems" :to="navItem.link" activeClass="bg-blue-700" class="rounded flex justify-center items-center mb-2 h-10 w-10 hover:bg-slate-500">
                <img :src="navItem.imgSrc" class="h-6 w-6" height="25" width="25" :alt="navItem.title"/>
            </NuxtLink>
        </nav>
    </header>
</template>

<script setup lang="ts">
import travelsIcon from '~/assets/img/plane.svg'
import bookingIcon from '~/assets/img/calendar.svg'
import { PaginationsEnum } from '~/types/pagination';

const navItems = [
    { title: PaginationsEnum.travels, link: '/travels', imgSrc: travelsIcon },
    { title: PaginationsEnum.bookings, link: '/bookings', imgSrc: bookingIcon }
]
</script>