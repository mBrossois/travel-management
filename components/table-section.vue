<template>
    <section class="mb-8 border-2 border-cyan-900 rounded w-52 max-h-[65rem] sm:w-[31rem] md:w-[39rem] lg:w-[55rem] xl:w-full transition-[max-height]" :class="isSectionOpen ? '' : '!max-h-16 overflow-hidden'">
        <div class=" bg-teal-900 text-white h-16 cursor-pointer flex justify-between items-center px-4" @click="toggleSection">
            <h3 h2 class="text-xl mb-2">{{ title }}</h3>
            <icons-chevron :orientation="isSectionOpen ? OrientationEnum.down : OrientationEnum.up" class="fill-white ml-2 h-5 w-5"></icons-chevron>

        </div>

        <div v-if="pageInfo && pageInfo.totalItems > 0" class="overflow-scroll">
            <table class="table-auto h-px w-full text-center">
                <tbody class="h-full">

                    <tr class="bg-teal-600 text-white">
                        <th v-for="layout in tableLayout" :class="{'hidden': layout.isHidden}" @click="layout.sortTitle? onSort(layout.sortTitle) : undefined">
                            <div class="flex justify-center">{{ layout.title }}
                                <img v-if="layout.sortTitle && layout.sortTitle === sort.type" class="ml-2 transition-transform" :class="{'rotate-180': !sort.inStartPosition}" src="~/assets/img/chevron-up.svg" height="12" width="12"/>
                            </div>
                        </th>

                    </tr>

                    <tr v-for="(tableRow, index) in tableData" :key="tableRow.id" 
                        :class=" {
                            'hidden': isRowHidden(index), 
                            'hover:!bg-white cursor-default': isEditableDisabled,
                            'bg-teal-50 cursor-default': highlightTravelId === tableRow.id
                        }" 
                        class="cursor-pointer h-full border-b-2 hover:bg-teal-50" 
                        @click="onUpdateRow(tableRow)"
                        >
                        
                        <td v-for="(layout, index) in tableLayout" class="h-full">
                            <div v-if="layout.type === 'img'"  class="w-32 h-16 lg:h-24 lg:w-48 overflow-hidden"><cloudinary-image class="transform-img-middle" :name="tableRow[layout.dataKey as string]" :alt="tableRow.imgAlt" :height="200" :width="200"></cloudinary-image></div>
                            
                            <div v-else-if="layout.type === 'object'">
                                <p v-for="(item, index) in tableRow[layout.dataKey]">
                                    {{ index }}: {{ item }}
                                </p>
                            </div>
                            
                            <span v-else-if="layout.type === 'text' || layout.type === 'price'">
                                <span v-if="layout.type === 'price'">&euro;</span>
                                {{ tableRow[layout.dataKey as string] }}
                            </span>
                            <span v-else-if="layout.type === 'date'">{{ formatDate(tableRow[layout.dataKey as string], 'DD/MM/YYYY') }}</span>
                            <div v-else-if="layout.type === 'rating'" class="flex justify-center"><img v-for="star of tableRow[layout.dataKey as string]" :key="star" src="~/assets/img/star.svg" height="24" width="24" alt="star icon"/></div>
                            <div v-else class="h-full w-full flex justify-center items-center" @mouseenter="onDeleteHover(tableRow.id!)" @mouseleave="onDeleteHover(-1)" @click.stop="onDeleteRow(tableRow.id!)"><icons-thrash :hovered="tableRow.id === deleteHovered"></icons-thrash></div>
                        </td>    
                  
                    </tr>
                </tbody>
            </table>
        </div>
        <pagination v-if="pageInfo && pageInfo.totalItems > 0" :pageInfo="pageInfo" :time-period="timePeriod" :active-page="page" @on-switch-page="getNewPage"></pagination>
        <div v-if="pageInfo && pageInfo.totalItems === 0" class="p-4 flex items-center justify-center flex-col">
            <p class="p-4">No travels added yet!</p>
            <button class="btn btn-black w-32" @click="emits('onAddRow')">Add travel</button>
        </div>
    </section>
</template>

<script setup lang="ts">
import { useTravelsStore } from '~/store/travels';
import { useBookingsStore } from '~/store/bookings'
import {OrientationEnum, type TimePeriod, type TableLayout } from '~/types';
import { PaginationsEnum, type PageInfo, type PaginationsType } from '~/types/pagination';

const props = defineProps<{
    title: string,
    page: PaginationsType,
    tableLayout?: Array<TableLayout>,
    tableData?: Array<any>,
    timePeriod: TimePeriod,
    pageInfo?: PageInfo,
    isEditableDisabled?: boolean,
    highlightTravelId?: number
}>()

const emits = defineEmits(['onAddRow', 'onUpdateRow', 'onDeleteRow', 'onSort', 'onNewPage'])

const store = props.page === PaginationsEnum.travels ? useTravelsStore() : useBookingsStore()

const sort = ref(store.getSort(props.timePeriod))

const currentPage = computed(() => {
    return props.pageInfo?.currentPage ? props.pageInfo.currentPage : 0
})

const isSectionOpen = ref(true)

const deleteHovered = ref()

function toggleSection() {
    isSectionOpen.value = !isSectionOpen.value
}

function isRowHidden(index: number) {
    if(currentPage.value === 1) {
        return index > 4
    }

    if(props.pageInfo && props.pageInfo.totalPages >= 3 && currentPage.value === props.pageInfo.totalPages) {

        return index <= 9
    }

    return (index <= 4 || index > 9)
}

function onSort(travelKey: any) {
    emits('onSort', travelKey, props.timePeriod, currentPage.value)
}

function onUpdateRow(row: Object) {
    emits('onUpdateRow', row)
}

function onDeleteHover(id: number) {
    deleteHovered.value = id;
}

async function onDeleteRow(id: number) {
    emits('onDeleteRow', id)
}

function getNewPage(page: number, amountToGet: number, deletePage?: number) {
    emits('onNewPage', page, amountToGet, deletePage)
}
</script>