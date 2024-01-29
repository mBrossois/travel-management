export type PageInfo = {
    totalItems: number, 
    totalPages: number, 
    itemsPerPage: number,
    currentPage?: number
}

export type TimePeriodPagesInfo = {
    future: PageInfo,
    current: PageInfo,
    past: PageInfo,
}

export type AllPagesInfo = {
    travels: TimePeriodPagesInfo,
    bookings: TimePeriodPagesInfo,
}

export enum PaginationsEnum {
    'travels'= 'travels',
    'bookings' = 'bookings'
}

export type PaginationsType = PaginationsEnum.bookings | PaginationsEnum.travels