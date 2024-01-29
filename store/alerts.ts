import { type Alert, type AlertType, AlertAnimationStateEnum } from "~/types"

export const useAlertsStore = defineStore('alerts', () => {
    const alerts: Ref<Array<Alert>> = ref([])
    let lastId = 0

    const getAlerts = computed(() => alerts.value)

    function addAlert(message: string, type: AlertType) {
        const alertId = lastId
        alerts.value.push({id: lastId, message: message, type: type, animationState: AlertAnimationStateEnum.appear})
        lastId++

        setTimeout( () => changeState(alertId), 3000)
    }

    function changeState(id: number) {

        const alert = alerts.value.find( alert => alert.id === id)
        if(alert) {
            alert.animationState = AlertAnimationStateEnum.dissapear

            setTimeout( () => removeAlert(id), 500)
        }
    }

    function removeAlert(id: number) {
        alerts.value = alerts.value.filter( alert => alert.id !== id)
    }
  
    return { getAlerts, addAlert }
  })
  
  