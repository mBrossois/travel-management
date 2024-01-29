import { PaginationsEnum, type AllPagesInfo, type PaginationsType, type TimePeriodPagesInfo } from "~/types/pagination"
import type { TimePeriodEnum } from "~/types"
import { getAllPagesInfo } from "~/api/pagination"

export const usePaginationStore = defineStore('pagination', () => {
    const pagesInfo: Ref<AllPagesInfo>  = ref({travels: {}, bookings: {}} as AllPagesInfo)
    const pagesInfoInitialized = ref({travels: false, bookings: false})

    const getIsPaginationInitialized = computed(() => pagesInfoInitialized.value)

    const getPagesInfo = computed(() => pagesInfo.value)
    const getTravelsPages = computed(() => pagesInfo.value.travels)
    const getFutureTravelsPages = computed(() => pagesInfo.value?.travels.future)
    const getCurrentTravelsPages = computed(() => pagesInfo.value?.travels.current)
    const getPastTravelsPages = computed(() => pagesInfo.value?.travels.past)

    const getFutureBookingsPages = computed(() => pagesInfo.value?.bookings.future)
    const getCurrentBookingsPages = computed(() => pagesInfo.value?.bookings.current)
    const getPastBookingsPages = computed(() => pagesInfo.value?.bookings.past)

    async function initializePages(pageginationsType: PaginationsType) {
        
        if(!getIsPaginationInitialized.value[pageginationsType]) {
    
            const result = await getAllPagesInfo(pageginationsType)
        
            if( result ) {
                result.future.currentPage = 1
                result.current.currentPage = 1
                result.past.currentPage = 1

                pagesInfo.value[pageginationsType] = result
                pagesInfoInitialized.value[pageginationsType] = true
            }
        }
    }

    function setCurrentPage(page: number, timePeriod: TimePeriodEnum, pageginationsType: PaginationsType) {
        getPagesInfo.value[pageginationsType][timePeriod].currentPage = page
    }

    function addPageItem(pageginationsType: PaginationsType, timePeriod: TimePeriodEnum) {
        getPagesInfo.value[pageginationsType][timePeriod].totalItems = getPagesInfo.value[pageginationsType][timePeriod].totalItems + 1
        getPagesInfo.value[pageginationsType][timePeriod].totalPages = Math.ceil(getPagesInfo.value[pageginationsType][timePeriod].totalItems / getPagesInfo.value[pageginationsType][timePeriod].itemsPerPage)
    }

    function removePageItem(pageginationsType: PaginationsType, timePeriod: TimePeriodEnum) {
        getPagesInfo.value[pageginationsType][timePeriod].totalItems = getTravelsPages.value[timePeriod].totalItems - 1
        getPagesInfo.value[pageginationsType][timePeriod].totalPages = Math.ceil(getTravelsPages.value[timePeriod].totalItems / getTravelsPages.value[timePeriod].itemsPerPage)
    }
  
    return {getPagesInfo ,getTravelsPages, getFutureTravelsPages, getCurrentTravelsPages, getPastTravelsPages, getFutureBookingsPages, getCurrentBookingsPages, getPastBookingsPages, getIsPaginationInitialized, initializePages, setCurrentPage, removePageItem, addPageItem }
  })
  
  