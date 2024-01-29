import { GendersEnum, type Bookings, PaymentsTypeEnum } from "~/types/bookings"

export const bookingsDB: Bookings = {
    future: [
      {id: 21, travelName: 'Fashionable Milan', customerInfo: { fullName: 'J D', phoneNumber: '0693323233', email: 'exap@gmail.com', birthdate: '1997-02-21', gender: GendersEnum.man}, paymentType: PaymentsTypeEnum.creditTransfer, internalNotes: 'You are beatifull today' },
      {id: 20, travelName: 'Fashionable Milan 2', customerInfo: { fullName: 'Dyl James', phoneNumber: '0693313233', email: 'exap@gmail.com', birthdate: '1997-02-21', gender: GendersEnum.man}, paymentType: PaymentsTypeEnum.creditTransfer, internalNotes: 'Totally stunning'},
      {id: 19, travelName: 'Peru party', customerInfo: { fullName: 'Lara Croft', phoneNumber: '0695323233', email: 'exap@gmail.com', birthdate: '1997-02-21', gender: GendersEnum.man}, paymentType: PaymentsTypeEnum.creditTransfer },
      {id: 18, travelName: 'Peru party', customerInfo: { fullName: 'Peter Park', phoneNumber: '0693353233', email: 'exap@gmail.com', birthdate: '1997-02-21', gender: GendersEnum.man}, paymentType: PaymentsTypeEnum.paypal },
      {id: 17, travelName: 'Spanish sleepy times', customerInfo: { fullName: 'Ginny Potter', phoneNumber: '0693923233', email: 'exap@gmail.com', birthdate: '1997-02-21', gender: GendersEnum.man}, paymentType: PaymentsTypeEnum.revolut },
      {id: 16, travelName: 'Fashionable Milan', customerInfo: { fullName: 'James Dean', phoneNumber: '0693328883', email: 'exap@gmail.com', birthdate: '1997-02-21', gender: GendersEnum.man}, paymentType: PaymentsTypeEnum.creditTransfer },
      {id: 15, travelName: 'Z Fashionable Milan last', customerInfo: { fullName: 'Appl ebee', phoneNumber: '0644323233', email: 'exap@gmail.com', birthdate: '1997-02-21', gender: GendersEnum.man}, paymentType: PaymentsTypeEnum.revolut },
    ],
    current: [
      {id: 10, travelName: 'Peru party', customerInfo: { fullName: 'James Dean', phoneNumber: '0693323283', email: 'exap@gmail.com', birthdate: '1997-02-21', gender: GendersEnum.man}, paymentType: PaymentsTypeEnum.revolut },
      {id: 9, travelName: 'Peru party', customerInfo: { fullName: 'J D', phoneNumber: '0693323239', email: 'exap@gmail.com', birthdate: '1997-02-21', gender: GendersEnum.man}, paymentType: PaymentsTypeEnum.paypal },
      {id: 8, travelName: 'Peru party', customerInfo: { fullName: 'Lara Croft', phoneNumber: '0695323233', email: 'exap@gmail.com', birthdate: '1997-02-21', gender: GendersEnum.man}, paymentType: PaymentsTypeEnum.paypal },
      {id: 7, travelName: 'Spanish sleepy times', customerInfo: { fullName: 'J D', phoneNumber: '0693235533', email: 'exap@gmail.com', birthdate: '1997-02-21', gender: GendersEnum.man}, paymentType: PaymentsTypeEnum.creditTransfer },
      {id: 6, travelName: 'Fashionable Milan', customerInfo: { fullName: 'James Dean', phoneNumber: '0633323233', email: 'exap@gmail.com', birthdate: '1997-02-21', gender: GendersEnum.man}, paymentType: PaymentsTypeEnum.revolut },
      {id: 5, travelName: 'Fashionable Milan 2', customerInfo: { fullName: 'J D', phoneNumber: '0693323533', email: 'exap@gmail.com', birthdate: '1997-02-21', gender: GendersEnum.man}, paymentType: PaymentsTypeEnum.creditTransfer },
    ],
    past: [
      {id: 2, travelName: 'Spanish sleepy times', customerInfo: { fullName: 'Lara Croft', phoneNumber: '0693327733', email: 'exap@gmail.com', birthdate: '1997-02-21', gender: GendersEnum.man}, paymentType: PaymentsTypeEnum.revolut },
      {id: 1, travelName: 'Fashionable Milan', customerInfo: { fullName: 'James Dean', phoneNumber: '0693323288', email: 'exap@gmail.com', birthdate: '1997-02-21', gender: GendersEnum.man}, paymentType: PaymentsTypeEnum.paypal },
      {id: 0, travelName: 'Fashionable Milan 2', customerInfo: { fullName: 'J D', phoneNumber: '0693323299', email: 'exap@gmail.com', birthdate: '1997-02-21', gender: GendersEnum.man}, paymentType: PaymentsTypeEnum.creditTransfer },
    ],
  }