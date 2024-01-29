import { useDayjs } from '#dayjs' // not need if you are using auto import
import { TimePeriodEnum, type TimePeriod } from '~/types'
import {  type Travel } from '~/types/travels'

export function getKeyValue(object: Object, key: keyof Object): any {
    return (object[key] || '')
}

export function formatDate(date: string, format: string) {
    const dayjs = useDayjs()
    return dayjs(date).format(format) 
}

export function orderList(itemA: string | number, itemB:  string | number, sortType: string) {
    if(sortType === 'number') {
        return itemA as number - (itemB as number)
    } else if(  sortType === 'date' ) {
        return Number((itemA as string).split('-').join('')) - Number((itemB as string).split('-').join(''))
    } else if(sortType === 'string') {
        return (itemA as string).localeCompare(itemB as string)
    } else {
        return 0
    }
}

export function getTimePeriod(travel: Travel): TimePeriod | undefined{
    const today = formatDate(new Date().toString(), 'YYYYMMDD')
    const departureDate = formatDate(travel.departureDate, 'YYYYMMDD')
    const arrivalDate = formatDate(travel.returnDate, 'YYYYMMDD')

    if(departureDate > today) {
        return TimePeriodEnum.future
    }

    if (departureDate <= today && arrivalDate >= today ) {
        return TimePeriodEnum.current
    }

    if( arrivalDate < today) {
        return TimePeriodEnum.past
    }

    return undefined
}