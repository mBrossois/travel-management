import { useAlertsStore } from "~/store/alerts"
import { AlertTypeEnum } from "~/types"
import type { TimePeriodPagesInfo } from "~/types/pagination"

export async function getAllPagesInfo(infoType: string) {
    const { data, error } = await useFetch<TimePeriodPagesInfo>('/api/pages-info', { params: {type: infoType} })

    if( error.value ) {
        const alertStore = useAlertsStore()
        alertStore.addAlert('Something went wrong', AlertTypeEnum.error)
    } else if( data.value ) {
        return data.value
    }
}