import { type Travel, type Travels, TravelKeysToType } from "~/types/travels"
import type { Ref } from "vue"
import { usePaginationStore } from "./pagination"
import type { TableSortOrder, TimePeriodEnum } from "~/types"
import { getAllTravels, getSingleTravel, getTravelsInTimeperiod } from "~/api/travels"

export const useTravelsStore = defineStore('travels', () => {
    const isInitialized = ref(false)
    const travels: Ref<Travels | undefined> = ref()
    const activeTravelsSort: Ref<TableSortOrder> = ref({
        future: {type: '', inStartPosition: true},
        current: {type: '', inStartPosition: true},
        past: {type: '', inStartPosition: true}
    })

    const paginationStore = usePaginationStore()
    
    const newTravelId = ref(-1)

    const getTravelsIsInitialized = computed(() => isInitialized.value)

    const getTravels = computed(() => travels.value )
    const getFutureTravels = computed(() => travels.value?.future)
    const getCurrentTravels = computed(() => travels.value?.current)
    const getPastTravels = computed(() => travels.value?.past)

    function getSort(timePeriod: TimePeriodEnum) {
        return activeTravelsSort.value[timePeriod]
    }

    async function initializeTravels() {
        if(!getTravelsIsInitialized.value) {
            const result = await getAllTravels()
            
            if( result ) {
                travels.value = result
                isInitialized.value = true
            }
        }
    }

    function updateTravelsInPeriod(travelList: Array<Travel>, timePeriod: TimePeriodEnum) {
        if(travels.value) travels.value[timePeriod] = travelList
    }

    function updateTravel(travel: Travel, timePeriod: TimePeriodEnum) {
        if(travels.value && travel.id) {
            const newTimePeriod = getTimePeriod(travel)
            if(newTimePeriod) {
                if(newTimePeriod !== timePeriod) {
                    deleteTravel(travel.id, timePeriod)
                }
                const travelsId = travels.value[newTimePeriod].findIndex( item => item.id === travel.id)
                travels.value[newTimePeriod][travelsId] = travel
            }
        }
    }

    function addPage(result: Array<Travel>, addBefore: boolean, timePeriod: TimePeriodEnum) {
        if(travels.value && addBefore) {
            travels.value[timePeriod] = travels.value[timePeriod].concat(result)
        } else if (travels.value) {
            travels.value[timePeriod] = result.concat(travels.value[timePeriod])
        }
    }

    function deletePage(page: number, amountToDelete: number, timePeriod: TimePeriodEnum) {
        if(travels.value) {
            travels.value[timePeriod].splice(page * amountToDelete, amountToDelete)
        }
    }

    function deleteTravel(id: number, timePeriod: TimePeriodEnum) {
        if(travels.value) {
            const travelId = travels.value[timePeriod].findIndex(item => item.id === id)
            travels.value[timePeriod].splice(travelId, 1)
        }   
    }

    async function addTravel(travel: Travel, timePeriod: TimePeriodEnum) {
        
        if(travels.value) {
            let travelId = 0
            const sort = activeTravelsSort.value[timePeriod]

            if(sort.type !== '') {
                const travelsCopy = [...travels.value[timePeriod], travel]
                travelsCopy.sort(a => {
                    const firstValue = (sort.inStartPosition ? travel[sort.type as keyof Travel] : a[sort.type as keyof Travel]) as unknown as string | number
                    const secondValue = (sort.inStartPosition ? a[sort.type as keyof Travel] : travel[sort.type as keyof Travel]) as unknown as string | number
                    
                    return  orderList(firstValue, secondValue, TravelKeysToType[sort.type as keyof Object].toString())
                    
                })
                travelId = travelsCopy.findIndex( item => item.id === travel.id)
            }

            const pageInfo = paginationStore.getTravelsPages[timePeriod]
            if(travelId === 0 && pageInfo.totalItems > 15 && pageInfo.currentPage && pageInfo.currentPage > 1 ) {
                const result = await getSingleTravel(sort, timePeriod, false, travels.value[timePeriod][0].id)

                travel = result ? result : travel
            }

            travel.id = newTravelId.value
            travels.value[timePeriod].splice(travelId, 0, travel)
            if(travels.value[timePeriod].length > 15) {
                travels.value[timePeriod].pop()
            }
            newTravelId.value--
        }
    }

    async function setSort(sort: string, timePeriod: TimePeriodEnum, currentPage: number) {

        let startPage = currentPage - 2
        if(currentPage === 1) {
            startPage = 0
        }
        if(currentPage === paginationStore.getPagesInfo.travels[timePeriod].totalPages) {
            startPage = currentPage - 3
        }

        if(activeTravelsSort.value[timePeriod].type === sort) {
            activeTravelsSort.value[timePeriod].inStartPosition = !activeTravelsSort.value[timePeriod].inStartPosition
        } else {
            activeTravelsSort.value[timePeriod].type = sort
            activeTravelsSort.value[timePeriod].inStartPosition = true
        }
    
        const result = await getTravelsInTimeperiod('sort', timePeriod, sort, getSort(timePeriod).inStartPosition, startPage, 15)
    
        if( result ) {
            updateTravelsInPeriod(result, timePeriod)
        } 

    }
  
    return { 
        getTravelsIsInitialized, 
        getFutureTravels, 
        getCurrentTravels, 
        getPastTravels, 
        initializeTravels, 
        getTravels,
        updateTravel, 
        deleteTravel,
        addTravel,
        updateTravelsInPeriod,
        addPage,
        deletePage,
        setSort,
        getSort
    }
  })
  
  