import type { SortOrder } from "."

export type Travel = {
    id?: number,
    name: string,
    description: string,
    departureDate: string,
    returnDate: string,
    imgSrc: string,
    imgAlt: string,
    pricePerTicket: number,
    rating?: number
}

export type Travels = {
    future: Array<Travel>,
    past: Array<Travel>,
    current: Array<Travel>,
}

export enum TravelKeys {
    'id' = 'id',
    'name' = 'name',
    'description' = 'description',
    'departureDate' = 'departureDate',
    'returnDate' = 'returnDate',
    'imgSrc' = 'imgSrc',
    'imgAlt' = 'imgAlt',
    'pricePerTicket' = 'pricePerTicket',
    'rating' = 'rating'
}

export enum TravelKeysToType {
    'name' = 'string',
    'departureDate' = 'date',
    'returnDate' = 'date',
    'pricePerTicket' = 'number'
}