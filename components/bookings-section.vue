<template>

    <table-section 
        :title="title" 
        :page="PaginationsEnum.bookings" 
        :table-data="bookings" 
        :table-layout="tableLayout" 
        :time-period="timePeriod" 
        :page-info="pageInfo"
        :is-editable-disabled="true"
        @onAddRow="emits('onAddBooking')"
        @onSort="sortBookings"
        @onNewPage="getNewPage"
    ></table-section>

</template>

<script setup lang="ts">
import {type Booking, BookingKeys } from '~/types/bookings'
import { PaginationsEnum, type PageInfo } from '~/types/pagination';
import { useBookingsStore } from '~/store/bookings';
import { usePaginationStore } from '~/store/pagination';
import type { TimePeriod, TableLayout } from '~/types';
import { getBookingsInTimeperiod } from '~/api/bookings';

const props = defineProps<{
    title: string,
    bookings?: Array<Booking>,
    timePeriod: TimePeriod,
    pageInfo?: PageInfo
}>()

const emits = defineEmits(['onAddBooking'])

const tableLayout: Array<TableLayout> = [
    { title: 'Booking name', type: 'text', dataKey: BookingKeys.travelName, sortTitle: BookingKeys.travelName, isHidden: false },
    { title: 'Customer info', type: 'object', dataKey: BookingKeys.customerInfo, isHidden: false },
    { title: 'Payment type', type: 'text', dataKey: BookingKeys.paymentType, sortTitle: BookingKeys.paymentType, isHidden: false },
    { title: 'Internal notes', type: 'text', dataKey: BookingKeys.internalNotes, isHidden: false }
]


const bookingsStore = useBookingsStore()
const paginationStore = usePaginationStore()

paginationStore.initializePages(PaginationsEnum.travels)

const currentPage = computed(() => {
    return props.pageInfo?.currentPage ? props.pageInfo.currentPage : 0
})

const sort = ref(bookingsStore.getSort(props.timePeriod))

async function sortBookings(bookingKey: any) {
    bookingsStore.setSort(bookingKey, props.timePeriod)
    sort.value = bookingsStore.getSort(props.timePeriod)
    let startPage = currentPage.value - 2
    if(currentPage.value === 1) {
        startPage = 0
    }
    if(currentPage.value === props.pageInfo?.totalPages) {
        startPage = currentPage.value - 3
    }

    const result = await getBookingsInTimeperiod('sort', props.timePeriod, bookingKey, sort.value.inStartPosition, startPage, 15)

    if( result ) {
        bookingsStore.updateBookingsInPeriod(result, props.timePeriod)
    } 
   
}

async function getNewPage(page: number, amountToGet: number, deletePage?: number) { 
   
    const result = await getBookingsInTimeperiod('sort', props.timePeriod, sort.value.type, sort.value.inStartPosition, page, amountToGet)

    if(result && (amountToGet === 15 || amountToGet === - 15 )) {
        bookingsStore.updateBookingsInPeriod(result, props.timePeriod)
    } else if(result && amountToGet === 5 && deletePage !== undefined) {
        bookingsStore.deletePage(deletePage, amountToGet, props.timePeriod)
        bookingsStore.addPage(result, deletePage === 0, props.timePeriod)
    }
}

</script>

<style>
@media screen and (min-width: 620px) {
    th, td {
        padding: 1rem;
    }
}

@media screen and (min-width: 1024px) {
    tr td {
        min-width: unset;
    }
}

th, td {
    padding-right: 1rem;
}

td {
    min-width: 10rem;
}

th {
    cursor: pointer;
}
</style>