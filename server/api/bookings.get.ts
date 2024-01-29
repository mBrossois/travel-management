import { ref } from "vue";
import { bookingsDB } from "~/db/bookings";
import { pageInfoDb } from "~/db/pageInfo";
import { TimePeriodEnum } from "~/types";
import { Bookings } from "~/types/bookings";

export default defineEventHandler((event) => {

    const bookings = bookingsDB
    const bookingsResult = ref({future: [], past: [], current: []} as Bookings)

    for(let bookingItem in bookings) {
      const pageInfo = pageInfoDb.bookings
      if(bookings[bookingItem as TimePeriodEnum].length > 15) {
        bookingsResult.value[bookingItem as keyof Bookings] = bookings[bookingItem as keyof Bookings].slice(0, 3 * pageInfo[bookingItem as TimePeriodEnum].itemsPerPage)
      } else {
        bookingsResult.value[bookingItem as keyof Bookings] = bookings[bookingItem as keyof Bookings]
      }
    }

    return bookingsResult.value
  })
  