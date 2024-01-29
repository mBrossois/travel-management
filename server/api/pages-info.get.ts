import { pageInfoDb } from "~/db/pageInfo"
import { AllPagesInfo } from "~/types/pagination"

export default defineEventHandler((event): AllPagesInfo => {
    const { type } = getQuery(event)
    return pageInfoDb[type as keyof Object]
  })
  