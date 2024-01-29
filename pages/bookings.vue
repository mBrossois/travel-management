<template>
     <header class="my-4">
        <button class="btn btn-black" @click="openModal">Add booking</button>
    </header>

    <bookings-section :time-period="TimePeriodEnum.future" title="Future bookings" :bookings="getFutureBookings" :pageInfo="getFutureBookingsPages" @on-add-booking="openModal"></bookings-section>
    <bookings-section :time-period="TimePeriodEnum.current" title="Current bookings" :bookings="getCurrentBookings" :pageInfo="getCurrentBookingsPages" @on-add-booking="openModal"></bookings-section>
    <bookings-section :time-period="TimePeriodEnum.past" title="past bookings" :bookings="getPastBookings" :pageInfo="getPastBookingsPages" @on-add-booking="openModal"></bookings-section>

    <modal-booking v-if="isModalOpen" :imgSrc="plusIcon" title="Add booking" confirmButton="Add" @on-cancel="closeModal" @on-save="saveBooking"></modal-booking>
</template>

<script setup lang="ts">
import { getAllBookings } from '~/api/bookings';
import { useBookingsStore } from '~/store/bookings';
import { usePaginationStore } from '~/store/pagination';
import { TimePeriodEnum} from '~/types'
import { PaginationsEnum } from '~/types/pagination';
import plusIcon from '~/assets/img/plus.svg'
import type { Booking } from '~/types/bookings';
import type { Travel } from '~/types/travels';

const bookingsStore = useBookingsStore()
const { getFutureBookings, getCurrentBookings, getPastBookings} = storeToRefs(bookingsStore)

const paginationStore = usePaginationStore()
const { getFutureBookingsPages, getCurrentBookingsPages, getPastBookingsPages} = storeToRefs(paginationStore)

await paginationStore.initializePages(PaginationsEnum.bookings)

if(!bookingsStore.getIsInitialized) {
    const result = await getAllBookings()
    
    if( result ) bookingsStore.initializeBookings(result)
}

const isModalOpen = ref(false)

function openModal() {
    isModalOpen.value = true;
}

function closeModal() {
    isModalOpen.value = false;
}

function saveBooking() {
    closeModal()
}
</script>