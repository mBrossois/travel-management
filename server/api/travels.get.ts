import { ref } from "vue";
import { pageInfoDb } from "~/db/pageInfo";
import { travelsDB } from "~/db/travels";
import { TimePeriodEnum } from "~/types";
import { Travels } from "~/types/travels"

export default defineEventHandler((event) => {

    const travels = travelsDB
    const travelsResult = ref({future: [], past: [], current: []} as Travels)

    for(let travelsPerTime in travels) {
      const pageInfo = pageInfoDb.travels
      if(travels[travelsPerTime as TimePeriodEnum].length > 15) {
        travelsResult.value[travelsPerTime as keyof Travels] = travels[travelsPerTime as keyof Travels].slice(0, 3 * pageInfo[travelsPerTime as TravelsTimePeriod].itemsPerPage)
      } else {
        travelsResult.value[travelsPerTime as keyof Travels] = travels[travelsPerTime as keyof Travels]
      }
    }

    return travelsResult.value
  })
  