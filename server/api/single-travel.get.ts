import { travelsDB } from "~/db/travels";
import { Travels } from "~/types/travels";

export default eventHandler<{ body: {  }; query: { beforeId?: string, afterId?: string, sort?: string, timePeriod: string} }>(
    (event) => {
        const { beforeId, afterId, timePeriod } = getQuery(event)
        const travels: Travels = travelsDB

        if(beforeId) {
            const travel = travels[timePeriod as keyof Travels].find(travel => travel.id === (Number(beforeId) - 1))
            if(travel) {
                return travel
            }

            return travels[timePeriod as keyof Travels].find(travel => travel.id === Number(beforeId))
        }

        if(afterId) {
            const travel = travels[timePeriod as keyof Travels].find(travel => travel.id === (Number(afterId) + 1))
            if(travel) {
                return travel
            }

            return travels[timePeriod as keyof Travels].find(travel => travel.id === Number(afterId))
        }

})