import type { SortOrder } from "."

export type CustomerInfo = {
    fullName: string,
    email: string,
    birthdate: string,
    phoneNumber: string,
    gender: Genders
}

export type Genders = GendersEnum.man | GendersEnum.woman | GendersEnum.other

export enum GendersEnum {
    'man' = 'man',
    'woman' = 'woman',
    'other' = 'other'
}

export type Booking = {
    id: number,
    travelId?: number,
    travelName: string,
    customerInfo: CustomerInfo,
    paymentType: PaymentType,
    internalNotes?: string,
}

export type Bookings = {
    future: Array<Booking>,
    past: Array<Booking>,
    current: Array<Booking>,
}

export enum BookingKeys {
    'id' = 'id',
    'travelName' = 'travelName',
    'customerInfo' = 'customerInfo',
    'paymentType' = 'paymentType',
    'internalNotes' = 'internalNotes'
}

export enum BookingKeysToType {
    'travelName' = 'string',
    'paymentType' = 'string',
}

export type BookingSortOrder = {
    future: SortOrder,
    past: SortOrder,
    current: SortOrder,
}

export enum PaymentsTypeEnum {
    'creditTransfer' = 'Credit transfer',
    'paypal' = 'Paypal',
    'revolut' = 'Revolut'
}

export type PaymentType = PaymentsTypeEnum.creditTransfer | PaymentsTypeEnum.paypal | PaymentsTypeEnum.revolut