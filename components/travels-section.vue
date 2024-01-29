
<template>

    <table-section 
        :title="title" 
        :page="PaginationsEnum.travels" 
        :table-data="travels" 
        :table-layout="tableLayout" 
        :time-period="timePeriod" 
        :page-info="pageInfo"
        @onAddRow="emits('onAddTravel')"
        @onUpdateRow="onOpenModal"
        @onDeleteRow="onDelete"
        @onSort="sortTravels"
        @onNewPage="getNewPage"
    ></table-section>

    <modal-travel v-if="isModalOpen" :travel="activeTravel" :imgSrc="penIcon" title="Update travel" confirmButton="Update" @on-cancel="closeModal" @on-save="updateTravel"></modal-travel>

</template>

<script setup lang="ts">
import {type Travel, TravelKeys } from '~/types/travels'
import { PaginationsEnum, type PageInfo } from '~/types/pagination';
import { useTravelsStore } from '~/store/travels';
import { usePaginationStore } from '~/store/pagination';
import penIcon from '~/assets/img/pen.svg'
import type { TimePeriod, TableLayout } from '~/types';
import { getSingleTravel, getTravelsInTimeperiod, deleteTravel, patchTravel } from '~/api/travels';

const props = defineProps<{
    title: string,
    travels?: Array<Travel>,
    timePeriod: TimePeriod,
    pageInfo?: PageInfo
}>()

const emits = defineEmits(['onAddTravel'])

const tableLayout: Array<TableLayout> = [
    { title: '', type: 'img', dataKey: TravelKeys.imgSrc , isHidden: false },
    { title: 'Travel name', type: 'text', dataKey: TravelKeys.name , sortTitle: TravelKeys.name, isHidden: false },
    { title: 'Departure', type: 'date', dataKey: TravelKeys.departureDate , sortTitle: TravelKeys.departureDate, isHidden: false },
    { title: 'Return', type: 'date', dataKey: TravelKeys.returnDate , sortTitle: TravelKeys.returnDate, isHidden: false },
    { title: 'Price single ticket', type: 'price', dataKey: TravelKeys.pricePerTicket , sortTitle: TravelKeys.pricePerTicket, isHidden: false },
    { title: 'Average rating', type: 'rating', dataKey: TravelKeys.rating , isHidden: false },
    { title: 'Tour description', type: 'text', dataKey: TravelKeys.description , isHidden: false },
    { title: 'Delete', type: 'delete', isHidden: false },
]

const travelsStore = useTravelsStore()
const paginationStore = usePaginationStore()

const currentPage = computed(() => {
    return props.pageInfo?.currentPage ? props.pageInfo.currentPage : 0
})

const sort = ref(travelsStore.getSort(props.timePeriod))

const isModalOpen = ref(false)
const activeTravel = ref()

function onOpenModal(travel: Travel) {
    isModalOpen.value = true
    activeTravel.value = travel
}

async function sortTravels(travelKey: any) {
    await travelsStore.setSort(travelKey, props.timePeriod, currentPage.value)
}

function closeModal() {
    isModalOpen.value = false
}

async function onDelete(id: number) {
    const result = await deleteTravel(id)

    if( result && props.travels) {
        travelsStore.deleteTravel(id, props.timePeriod)

        paginationStore.removePageItem(PaginationsEnum.travels, props.timePeriod)

        if (props.pageInfo && props.pageInfo.totalItems > 14 && props.pageInfo.totalPages !== currentPage.value) {

            const result = await getSingleTravel(sort, props.timePeriod, true, undefined, props.travels[props.travels.length - 1].id as number)
            if(result) travelsStore.addTravel(result, props.timePeriod)
        }
    }
    
    
}

async function updateTravel(travel: Travel) {
    const result = await patchTravel(travel)
    if(result) {
        travelsStore.updateTravel(travel, props.timePeriod)

        closeModal()
    }
}

async function getNewPage(page: number, amountToGet: number, deletePage?: number) { 
   
    const result = await getTravelsInTimeperiod('sort', props.timePeriod, sort.value.type, sort.value.inStartPosition, page, amountToGet)

    if(result && (amountToGet === 15 || amountToGet === - 15 )) {
        travelsStore.updateTravelsInPeriod(result, props.timePeriod)
    } else if(result && amountToGet === 5 && deletePage !== undefined) {
        travelsStore.deletePage(deletePage, amountToGet, props.timePeriod)
        travelsStore.addPage(result, deletePage === 0, props.timePeriod)
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