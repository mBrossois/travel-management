import { useAlertsStore } from "~/store/alerts";
import { AlertTypeEnum, type TimePeriod } from "~/types";
import type { Travel, Travels } from "~/types/travels";

export async function getSingleTravel(sort: Object, timePeriod: TimePeriod, showError: boolean = false, beforeId?: number, afterId?: number) {
    const { data, error } = await useFetch<Travel>('/api/single-travel', {
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

export async function getTravelsInTimeperiod(requestType: string, timePeriod: TimePeriod, sortOn: any, isSortStarted: boolean, pageNumber: number, amountToGet: number) {
    const { data, error } = await useFetch<Array<Travel>>('/api/travels-timeperiod', {
        params: { requestType, timePeriod, sortOn, isSortStarted, pageNumber, amountToGet}
    })

    if( error.value ) {
        const alertStore = useAlertsStore()
        alertStore.addAlert('Something went wrong', AlertTypeEnum.error)
    } else if( data.value ) {
        return data.value
    }
}

export async function getAllTravels() {
    const { data, error } = await useFetch<Travels>('/api/travels')

    if( error.value ) {
        const alertStore = useAlertsStore()
        alertStore.addAlert('Something went wrong', AlertTypeEnum.error)
    } else if( data.value ) {
        return data.value
    }
}

export async function postTravel(travel: Travel) {
    const { data , error} = await useFetch<Travel>('/api/travel', {
        method: 'post',
        body: { travel }
    })

    if( error.value ) {
        const alertStore = useAlertsStore()
        alertStore.addAlert('Something went wrong with deleting the travel', AlertTypeEnum.error)
    } else if( data.value ) {
        return data.value
    }
}

export async function patchTravel(travel: Travel) {
    const { data , error} = await useFetch<Travel>('/api/travel', {
        method: 'patch',
        body: { travel }
    })

    if( error.value ) {
        const alertStore = useAlertsStore()
        alertStore.addAlert('Something went wrong with deleting the travel', AlertTypeEnum.error)
    } else if( data.value ) {
        return data.value
    }
}






export async function deleteTravel(travelId: number) {
    const { data , error} = await useFetch<Travel>('/api/travel', {
        method: 'delete',
        body: { travelId}
    })

    if( error.value ) {
        const alertStore = useAlertsStore()
        alertStore.addAlert('Something went wrong with deleting the travel', AlertTypeEnum.error)
    } else if( data.value ) {
        return data.value
    }
}

