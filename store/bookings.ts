import type { Ref } from "vue"
import { usePaginationStore } from "./pagination"
import type { TableSortOrder, TimePeriodEnum } from "~/types"
import { BookingKeysToType, type Booking, type Bookings } from "~/types/bookings"
import { getSingleBooking } from "~/api/bookings"

export const useBookingsStore = defineStore('bookings', () => {
    const isInitialized = ref(false)
    const bookings: Ref<Bookings | undefined> = ref()
    const activeBookingSort: Ref<TableSortOrder> = ref({
        future: {type: '', inStartPosition: true},
        current: {type: '', inStartPosition: true},
        past: {type: '', inStartPosition: true}
    })

    const paginationStore = usePaginationStore()
    
    const newBookingId = ref(-1)

    const getIsInitialized = computed(() => isInitialized.value)
    const getFutureBookings = computed(() => bookings.value?.future)
    const getCurrentBookings = computed(() => bookings.value?.current)
    const getPastBookings = computed(() => bookings.value?.past)

    function getSort(timePeriod: TimePeriodEnum) {
        return activeBookingSort.value[timePeriod]
    }

    function initializeBookings(bookingsValue: Bookings) {
        bookings.value = bookingsValue
        isInitialized.value = true
    }

    function updateBookingsInPeriod(bookingsList: Array<Booking>, timePeriod: TimePeriodEnum) {
        if(bookings.value) bookings.value[timePeriod] = bookingsList
    }

    function deleteBooking(id: number, timePeriod: TimePeriodEnum) {
        if(bookings.value) {
            const bookingId = bookings.value[timePeriod].findIndex(item => item.id === id)
            bookings.value[timePeriod].splice(bookingId, 1)
        }   
    }

    async function addBooking(booking: Booking, timePeriod: TimePeriodEnum) {
        
        if(bookings.value) {
            let bookingId = 0
            const sort = activeBookingSort.value[timePeriod]

            if(sort.type !== '') {
                const bookingCopy = [...bookings.value[timePeriod], booking]
                bookingCopy.sort(a => {
                    const firstValue = (sort.inStartPosition ? booking[sort.type as keyof Object] : a[sort.type as keyof Object]) as unknown as string | number
                    const secondValue = (sort.inStartPosition ? a[sort.type as keyof Object] : booking[sort.type as keyof Object]) as unknown as string | number
                    
                    return  orderList(firstValue, secondValue, BookingKeysToType[sort.type as keyof Object].toString())
                    
                })
                bookingId = bookingCopy.findIndex( item => item.id === booking.id)
            }

            const pageInfo = paginationStore.getTravelsPages[timePeriod]
            if(bookingId === 0 && pageInfo.totalItems > 15 && pageInfo.currentPage && pageInfo.currentPage > 1 ) {
                const result = await getSingleBooking(sort, timePeriod, false, bookings.value[timePeriod][0].id)

                booking = result ? result : booking
            }

            booking.id = newBookingId.value
            bookings.value[timePeriod].splice(bookingId, 0, booking)
            if(bookings.value[timePeriod].length > 15) {
                bookings.value[timePeriod].pop()
            }
            newBookingId.value--
        }
    }

    function setSort(sort: string, timePeriod: TimePeriodEnum) {
        if(activeBookingSort.value[timePeriod].type === sort) {
            activeBookingSort.value[timePeriod].inStartPosition = !activeBookingSort.value[timePeriod].inStartPosition
        } else {
            activeBookingSort.value[timePeriod].type = sort
            activeBookingSort.value[timePeriod].inStartPosition = true
        }

    }


    function addPage(result: Array<Booking>, addBefore: boolean, timePeriod: TimePeriodEnum) {
        if(bookings.value && addBefore) {
            bookings.value[timePeriod] = bookings.value[timePeriod].concat(result)
        } else if (bookings.value) {
            bookings.value[timePeriod] = result.concat(bookings.value[timePeriod])
        }
    }

    function deletePage(page: number, amountToDelete: number, timePeriod: TimePeriodEnum) {
        if(bookings.value) {
            bookings.value[timePeriod].splice(page * amountToDelete, amountToDelete)
        }
    }
    return { 
        getIsInitialized, 
        getFutureBookings, 
        getCurrentBookings, 
        getPastBookings, 
        deleteBooking,
        initializeBookings, 
        updateBookingsInPeriod, 
        addBooking,
        setSort,
        getSort,
        addPage,
        deletePage
    }
  })
  
  