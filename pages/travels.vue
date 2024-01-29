<template>
    <header class="my-4">
        <button class="btn btn-black" @click="openModal">Add travel</button>
    </header>

    <div v-if="getIsPaginationInitialized.travels && getTravelsIsInitialized">
        <travels-section :time-period="TimePeriodEnum.future" title="Future travels" :travels="getFutureTravels" :pageInfo="getFutureTravelsPages" @on-add-travel="openModal"></travels-section>
        <travels-section :time-period="TimePeriodEnum.current" title="Current travels" :travels="getCurrentTravels" :pageInfo="getCurrentTravelsPages" @on-add-travel="openModal"></travels-section>
        <travels-section :time-period="TimePeriodEnum.past" title="Past travels" :travels="getPastTravels" :pageInfo="getPastTravelsPages" @on-add-travel="openModal"></travels-section>
    </div>
    <modal-travel v-if="isModalOpen" :imgSrc="plusIcon" title="Add travel" confirmButton="Add" @on-cancel="closeModal" @on-save="saveTravel"></modal-travel>
</template>

<script setup lang="ts">
import { type Travel } from '~/types/travels'
import { TimePeriodEnum} from '~/types'
import { PaginationsEnum, type TimePeriodPagesInfo } from '~/types/pagination'
import { useTravelsStore } from '~/store/travels'
import { usePaginationStore } from '~/store/pagination'

import plusIcon from '~/assets/img/plus.svg'
import { postTravel } from '~/api/travels'


const paginationStore = usePaginationStore()
const { getFutureTravelsPages, getCurrentTravelsPages, getPastTravelsPages, getIsPaginationInitialized } = storeToRefs(paginationStore)

const travelsStore = useTravelsStore()
const { getFutureTravels, getCurrentTravels, getPastTravels, getTravelsIsInitialized } = storeToRefs(travelsStore)

await paginationStore.initializePages(PaginationsEnum.travels)

await travelsStore.initializeTravels()

const isModalOpen = ref(false)

function openModal() {
    isModalOpen.value = true;
}

function closeModal() {
    isModalOpen.value = false;
}

async function saveTravel(travel: Travel) {
    const newTimePeriod = getTimePeriod(travel)
    if(newTimePeriod) {
        
        const result = await postTravel(travel) 
        
        if(result){
            paginationStore.addPageItem(PaginationsEnum.travels, newTimePeriod) 
            travelsStore.addTravel(travel, newTimePeriod)
            closeModal()
        }

    }
}
</script>