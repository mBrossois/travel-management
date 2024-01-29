import { useAlertsStore } from "~/store/alerts";
import { AlertTypeEnum, type TimePeriod } from "~/types";
import type { Booking, Bookings } from "~/types/bookings";

export async function getSingleBooking(sort: Object, timePeriod: TimePeriod, showError: boolean = false, beforeId?: number, afterId?: number) {
    const { data, error } = await useFetch<Booking>('/api/single-booking', {
        method: 'get',
        params: { beforeId, afterId, sort, timePeriod }
    })

    if( error.value && showError ) {
        const alertStore = useAlertsStore()
        alertStore.addAlert('Something went wrong', AlertTypeEnum.error)
    } else if( data.value ) {
        return data.value
    }
}

export async function getBookingsInTimeperiod(requestType: string, timePeriod: TimePeriod, sortOn: any, isSortStarted: boolean, pageNumber: number, amountToGet: number) {
    const { data, error } = await useFetch<Array<Booking>>('/api/bookings-timeperiod', {
        params: { requestType, timePeriod, sortOn, isSortStarted, pageNumber, amountToGet}
    })

    if( error.value ) {
        const alertStore = useAlertsStore()
        alertStore.addAlert('Something went wrong', AlertTypeEnum.error)
    } else if( data.value ) {
        return data.value
    }
}

export async function getAllBookings() {
    const { data, error } = await useFetch<Bookings>('/api/bookings')

    if( error.value ) {
        const alertStore = useAlertsStore()
        alertStore.addAlert('Something went wrong', AlertTypeEnum.error)
    } else if( data.value ) {
        return data.value
    }
}

export async function pushBooking(booking: Booking) {
    const { data, error } = await useFetch('/api/booking', {
        method: 'post',
        body: { booking}
    })

    if( error.value ) {
        const alertStore = useAlertsStore()
        alertStore.addAlert('Something went wrong', AlertTypeEnum.error)
    } else if( data.value ) {
        return data.value
    }
}