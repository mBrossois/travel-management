import { Ref, ref } from "vue";
import { pageInfoDb } from "~/db/pageInfo";
import { travelsDB } from "~/db/travels";
import { TimePeriodEnum } from "~/types";
import { Travel, TravelKeysToType, Travels } from "~/types/travels"
import { orderList } from "~/utils"

export default defineEventHandler((event) => {
    const {requestType, timePeriod, sortOn, isSortStarted, pageNumber, amountToGet} = getQuery(event)
    
    const pageInfo = pageInfoDb
    const travels: Ref<Array<Travel>> = ref(travelsDB[timePeriod as keyof Travels])
    // On sort
    function sortTravels(sortOn: keyof Object, isSortStarted: boolean) {
      travels.value.sort( (a, b) => {
        const firstValue = (!isSortStarted ? a[sortOn] : b[sortOn]) as unknown as string | number
        const secondValue = (!isSortStarted ? b[sortOn] : a[sortOn]) as unknown as string | number

        return orderList(firstValue, secondValue, TravelKeysToType[sortOn].toString())
      })
    }

    if(requestType && timePeriod && sortOn && isSortStarted && requestType === 'sort') {
        sortTravels(sortOn as keyof Object, JSON.parse(isSortStarted as string) as boolean)
    }

    // On new page
    if(requestType && timePeriod && pageNumber) {

        const amountOfPages = (pageNumber as Array<string>).length
        const itemsPerPage = pageInfo.travels[timePeriod as TimePeriodEnum].itemsPerPage

        let reversed = false
        let newAmountToget = amountToGet
        if(Number(amountToGet) < 0) {
          reversed = true
          newAmountToget = amountToGet * - 1
        } 

        travels.value = travels.value.slice(Number(pageNumber) * itemsPerPage, Number(newAmountToget) + Number(pageNumber) * itemsPerPage)
      }

    return travels.value
  })
  