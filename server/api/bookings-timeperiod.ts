import { Ref, ref } from "vue";
import { bookingsDB } from "~/db/bookings";
import { pageInfoDb } from "~/db/pageInfo";
import { TimePeriodEnum } from "~/types";
import { Booking, BookingKeysToType, Bookings } from "~/types/bookings";
import { orderList } from "~/utils"

export default defineEventHandler((event) => {
    const {requestType, timePeriod, sortOn, isSortStarted, pageNumber, amountToGet} = getQuery(event)
    
    const pageInfo = pageInfoDb
    const bookings: Ref<Array<Booking>> = ref(bookingsDB[timePeriod as keyof Bookings])
    // On sort
    function sortBookings(sortOn: keyof Object, isSortStarted: boolean) {
      bookings.value.sort( (a, b) => {
        const firstValue = (!isSortStarted ? a[sortOn] : b[sortOn]) as unknown as string | number
        const secondValue = (!isSortStarted ? b[sortOn] : a[sortOn]) as unknown as string | number

        return orderList(firstValue, secondValue, BookingKeysToType[sortOn].toString())
      })
    }

    if(requestType && timePeriod && sortOn && isSortStarted && requestType === 'sort') {
        sortBookings(sortOn as keyof Object, JSON.parse(isSortStarted as string) as boolean)
    }

    // On new page
    if(requestType && timePeriod && pageNumber) {

        const amountOfPages = (pageNumber as Array<string>).length
        const itemsPerPage = pageInfo.travels[timePeriod as TimePeriodEnum].itemsPerPage

        let reversed = false
        let newAmountToget = amountToGet
        if(Number(amountToGet) < 0) {
          reversed = true
          newAmountToget = amountToGet * - 1
        } 

        bookings.value = bookings.value.slice(Number(pageNumber) * itemsPerPage, Number(newAmountToget) + Number(pageNumber) * itemsPerPage)
      }

    return bookings.value
  })
  