<template>
    <div class="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6">
  <div class="flex flex-1 justify-between sm:hidden">
    <button :class="{'!cursor-default !bg-gray-50': currentPage === 1 }" class="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50" @click="currentPage === 1 ? undefined : onPageClick(currentPage - 1)">Previous</button>
    <button :class="{'!cursor-default !bg-gray-50': currentPage === pageInfo.totalPages}" class="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50" @click="currentPage === pageInfo.totalPages ? undefined : onPageClick(currentPage + 1)">Next</button>
  </div>
  <div class="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
    <div>
      <p class="text-sm text-gray-700">
        Showing
        <span class="font-medium">{{ getStartNumber() }}</span>
        to
        <span class="font-medium">{{ getEndNumber() }}</span>
        of
        <span class="font-medium">{{ pageInfo.totalItems }}</span>
        results
      </p>
    </div>
    <div>
      <nav class="isolate flex -space-x-px rounded-md shadow-sm" aria-label="Pagination">
        
        <button 
          :class="{'!cursor-default !bg-gray-50': currentPage === 1}" 
          class="relative min-w-9 flex justify-center items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
          @click="currentPage === 1 ? undefined : onPageClick(currentPage - 1)"
          >
          <span class="sr-only">Previosus</span>
          <icons-chevron :orientation="OrientationEnum.left" class="fill-gray-400 h-3 w-3"></icons-chevron>
        </button>

        <button v-if="currentPage >= 3 && pageInfo.totalPages > 3" 
          class="relative flex items-center justify-center min-w-9 px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
          @click="onPageClick(1)"
          >
          1
        </button>

        <span v-if="currentPage > 3" 
          class="relative min-w-9 flex items-center px-4 py-2 text-sm font-semibold text-gray-700 ring-1 ring-inset ring-gray-300 focus:outline-offset-0">
          ...
        </span>        
        <button v-for="pageNumber in 3" 
          :aria-current="middlePages[pageNumber - 1] === currentPage ? 'page' : undefined" 
          :class="{
            'hidden': ( middlePages[pageNumber - 1] <= 0 || middlePages[pageNumber - 1] > pageInfo.totalPages),
            '!bg-blue-700 hover:!bg-blue-700 !ring-blue-700 !cursor-default !text-white': middlePages[pageNumber - 1] === currentPage
            }" 
          class="relative flex items-center justify-center min-w-9 px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
          @click="middlePages[pageNumber - 1] === currentPage ? undefined : onPageClick(middlePages[pageNumber - 1])"
          >
          {{ middlePages[pageNumber - 1] }}
        </button>
        <span v-if="pageInfo.totalPages > 3 && pageInfo.totalPages - currentPage > 2" 
          class="relative min-w-9 inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-700 ring-1 ring-inset ring-gray-300 focus:outline-offset-0">
          ...
        </span>
        <button v-if="pageInfo.totalPages - currentPage >= 2 && pageInfo.totalPages > 3" 
          class="relative flex items-center justify-center min-w-9 px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0" 
          @click="onPageClick(pageInfo.totalPages)">
          {{ pageInfo.totalPages }}
        </button>
        
        <button 
          :class="{'!cursor-default !bg-gray-50': currentPage === pageInfo.totalPages}" 
          class="relative flex items-center justify-center min-w-9 rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
          @click="currentPage === pageInfo.totalPages ? undefined : onPageClick(currentPage + 1)"
          >
          <span class="sr-only">Next</span>
          <icons-chevron :orientation="OrientationEnum.right" class="fill-gray-400 h-3 w-3"></icons-chevron>
        </button>

      </nav>
    </div>
  </div>
</div>
</template>

<script setup lang="ts">
import { PaginationsEnum, type PageInfo, type PaginationsType } from '~/types/pagination';
import { usePaginationStore } from '~/store/pagination'

import { OrientationEnum, type TimePeriod } from '~/types';

const props = defineProps<{
  timePeriod: TimePeriod,
  pageInfo: PageInfo,
  activePage: PaginationsType
}>()

const emits = defineEmits(['onSwitchPage'])

const paginationStore = usePaginationStore()

const currentPage = computed(() => props.pageInfo.currentPage ? props.pageInfo.currentPage : 0 )

const middlePages = computed(() => {
  let startPage = currentPage.value - 1
  if(startPage < 1) {
    startPage = 1
  }

  if(props.pageInfo.totalPages - startPage <= 1 ) {
    startPage = props.pageInfo.totalPages - 2
  }
  return [
    startPage,
    startPage + 1,
    startPage + 2
  ]
}) 


function getStartNumber() {
  return 1 + (currentPage.value - 1) * props.pageInfo.itemsPerPage
}

function getEndNumber() {
  return currentPage.value === props.pageInfo.totalPages ? props.pageInfo.totalItems : currentPage.value * props.pageInfo.itemsPerPage
}

function onPageClick(page: number) {

  if(Math.max(currentPage.value, page) - Math.min(currentPage.value, page) > 2) {
    emits('onSwitchPage', page === props.pageInfo.totalPages ? page -  3 : page - 1, page === props.pageInfo.totalPages ? -15 : 15 )
  }

  if((currentPage.value > 1 && page > 1) && (currentPage.value < props.pageInfo.totalPages && page < props.pageInfo.totalPages)) {
    emits('onSwitchPage', page  > currentPage.value ? page : page - 2 , 5, page  > currentPage.value ? 0 : 2)
  }

  paginationStore.setCurrentPage(page, props.timePeriod, props.activePage)
}
</script>