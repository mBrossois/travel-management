import type { AllPagesInfo } from "~/types/pagination";


export const pageInfoDb: AllPagesInfo = {
  travels: {
    future: { totalItems: 30, totalPages: 6, itemsPerPage: 5},
    current: { totalItems: 10, totalPages: 2, itemsPerPage: 5},
    past:  { totalItems: 5, totalPages: 1, itemsPerPage: 5},
  },
  bookings: {
    future: { totalItems: 7, totalPages: 2, itemsPerPage: 5},
    current: { totalItems: 6, totalPages: 2, itemsPerPage: 5},
    past:  { totalItems: 3, totalPages: 1, itemsPerPage: 5},
  }
}