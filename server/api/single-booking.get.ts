import { bookingsDB } from "~/db/bookings";
import { TimePeriod } from "~/types";
import { Bookings } from "~/types/bookings";

export default eventHandler<{ body: {  }; query: { beforeId?: string, afterId?: string, sort?: string, timePeriod: string} }>(
    (event) => {
        const { beforeId, afterId, timePeriod } = getQuery(event)
        const bookings: Bookings = bookingsDB

        if(beforeId) {
            const booking = bookings[timePeriod as TimePeriod].find(booking => booking.id === (Number(beforeId) - 1))
            if(booking) {
                return booking
            }

            return bookings[timePeriod as TimePeriod].find(booking => booking.id === Number(beforeId))
        }

        if(afterId) {
            const booking = bookings[timePeriod as TimePeriod].find(booking => booking.id === (Number(afterId) + 1))
            if(booking) {
                return booking
            }

            return bookings[timePeriod as TimePeriod].find(booking => booking.id === Number(afterId))
        }

})