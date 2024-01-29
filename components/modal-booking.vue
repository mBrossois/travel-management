<template>
    <modal :pages="pages" :current-step="currentStep" @closeModal="emits('onCancel')" @onPageClick="onPageClick">
        <template #icon>
            <img class="h-6" :src="imgSrc">
        </template>
        <template #title>
            {{ title }}
        </template>
        <template #content>
            
            <div v-if="currentStep === 0" class="w-full max-w-[37rem] max-h-96 overflow-scroll" >
                <div v-for="travelItem in travelItems">
                    <table-section v-if="getTravels"
                    :title="travelItem.title" 
                    :page="PaginationsEnum.travels" 
                    :table-data="getTravels[travelItem.timePeriod]" 
                    :table-layout="travelsTableLayout" 
                    :time-period="travelItem.timePeriod" 
                    :page-info="getTravelsPages[travelItem.timePeriod]"
                    :highlight-travel-id="selectedTravel?.id"
                    @onSort="sortTravels"
                    @onUpdateRow="onSelectTravel"
                    ></table-section>
                    <p v-else>We couldn't find any travels</p>

                </div>
                
            </div>
            <div v-else class="flex gap-8 flex-wrap justify-start">
                <div v-for="(refKey, index) in activeRef">
                    <radio v-if="refKey.type === 'radio'"
                        :title="refKey.title" 
                        :form-id="index.toString()" 
                        :type="refKey.type" 
                        :error="refKey.error" 
                        :placeholder="refKey.placeholder" 
                        :values="refKey.values" 
                        @on-update="updateValue($event, index.toString())"
                    ></radio>
                    <text-area v-else-if="refKey.type === 'textarea'"
                        :title="refKey.title" 
                        :form-id="index.toString()" 
                        :type="refKey.type" 
                        :error="refKey.error" 
                        :placeholder="refKey.placeholder" 
                        :value="refKey.value" 
                        :hidden="refKey.hidden" 
                        @on-update="updateValue($event, index.toString())">
                    </text-area>
                    <input-block v-else
                        :title="refKey.title" 
                        :form-id="index.toString()" 
                        :type="refKey.type" 
                        :error="refKey.error" 
                        :placeholder="refKey.placeholder" 
                        :value="refKey.value" 
                        :hidden="refKey.hidden" 
                        :autocomplete="refKey.autocomplete"
                        @on-update="updateValue($event, index.toString())">
                    </input-block>
                </div>
            </div>
        </template>
        <template #buttons>

            <button v-if="currentStep < pages.length - 1" type="button" :disabled="!isFormValid" class="inline-flex w-full justify-center rounded-md bg-green-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-500 sm:ml-3 sm:w-auto disabled:bg-gray-300 disabled:text-gray-600" @click="nextStep">Next</button>
            <button v-if="currentStep === pages.length - 1" type="button" :disabled="!isFormValid" class="inline-flex w-full justify-center rounded-md bg-green-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-500 sm:ml-3 sm:w-auto disabled:bg-gray-300 disabled:text-gray-600" @click="onUpdatedTravel">{{ confirmButton }}</button>
            <button type="button" class="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto" @click="emits('onCancel')">Cancel</button>
        </template>
    </modal>
</template>

<script setup lang="ts">
import { useBookingsStore } from '~/store/bookings';
import { usePaginationStore } from '~/store/pagination';
import { useTravelsStore } from '~/store/travels';
import { TimePeriodEnum, type TableLayout, type TimePeriod } from '~/types';
import type { Booking } from '~/types/bookings';
import { PaginationsEnum } from '~/types/pagination';
import { TravelKeys, type Travel } from '~/types/travels';
import { pushBooking } from '~/api/bookings'

const props = defineProps({
    title: String,
    confirmButton: String,
    imgSrc: String,
})

const emits = defineEmits(['onSave', 'onCancel'])

const travelsStore = useTravelsStore()
const { getTravels } = storeToRefs(travelsStore)

const paginationStore = usePaginationStore()
const { getTravelsPages } = storeToRefs(paginationStore)

const bookingsStore = useBookingsStore()

travelsStore.initializeTravels()

const currentStep = ref(0)

const pages = [ 'Travel','Customer', 'Payment']

const isFormValid = ref(false)

const selectedTravel: Ref<Travel | undefined> = ref()

const travelItems = [
    { title: 'Future travels', timePeriod: TimePeriodEnum.future },
    { title: 'Current travels', timePeriod: TimePeriodEnum.current },
    { title: 'Past travels', timePeriod: TimePeriodEnum.past }
]

const travelsTableLayout: Array<TableLayout> = [
    { title: '', type: 'img', dataKey: TravelKeys.imgSrc , isHidden: false },
    { title: 'Travel name', type: 'text', dataKey: TravelKeys.name , sortTitle: TravelKeys.name, isHidden: false },
    { title: 'Departure', type: 'date', dataKey: TravelKeys.departureDate , sortTitle: TravelKeys.departureDate, isHidden: false },
    { title: 'Return', type: 'date', dataKey: TravelKeys.returnDate , sortTitle: TravelKeys.returnDate, isHidden: false },
    { title: 'Price single ticket', type: 'price', dataKey: TravelKeys.pricePerTicket , sortTitle: TravelKeys.pricePerTicket, isHidden: false },
    { title: 'Average rating', type: 'rating', dataKey: TravelKeys.rating , isHidden: false },
    { title: 'Tour description', type: 'text', dataKey: TravelKeys.description , isHidden: false },
]

const customerRef: Ref<{[key: string]: { value: any, values?: any, title: string, type: string, autocomplete?: string, active?: string, error?: string, placeholder?: string, hidden?: boolean}}> = 
    ref(
        {
            fullName: { value: '', type: 'text', title: 'full name', placeholder: 'Peter Parker', autocomplete: 'name' },
            phoneNumber: { value: '', type: 'tel', title: 'phone number', placeholder: '+33676332327' },
            email: { value: '', type: 'email', title: 'email', placeholder: 'example@gmail.com', autocomplete: 'email' },
            birthDate: { value: '', type: 'Date', title: 'birthdate', placeholder: '', autocomplete: 'tel' },
            gender: { value: '', values: ['man', 'woman', 'other'], type: 'radio', title: 'select gender', active: "" },
        }
    )

const paymentRef: Ref<{[key: string]: { value: any, values?: any, title: string, type: string, active?: string, error?: string, placeholder?: string, hidden?: boolean}}> = 
    ref(
        {
            paymentType: { value: '', values: ['Paypal', 'Credit transfer', 'Revolut'], type: 'radio', title: 'select gender', active: ""},
            internalNotes: { value: '', type: 'textarea', title: 'Optional notes', placeholder: 'Want to pay later' }
        }
    )

const activeRef = ref(customerRef.value)


async function onUpdatedTravel() {
    if(selectedTravel.value) {

        const booking: Booking = {
            id: -1,
            travelId: selectedTravel.value.id,
            travelName: selectedTravel.value.name,
            customerInfo: {
                fullName: customerRef.value.fullName.value, 
                phoneNumber: customerRef.value.phoneNumber.value,
                email: customerRef.value.email.value,
                birthdate: customerRef.value.birthDate.value,
                gender: customerRef.value.gender.value
            },
            paymentType: paymentRef.value.paymentType.value,
            internalNotes: paymentRef.value.internalNotes.value === '' ? undefined : paymentRef.value.internalNotes.value
        }

        const newTimePeriod = getTimePeriod(selectedTravel.value)
        if(newTimePeriod) {
            const result = await pushBooking(booking)
            if(result) {
                paginationStore.addPageItem(PaginationsEnum.bookings, newTimePeriod) 
                bookingsStore.addBooking(booking, newTimePeriod)
                
                emits('onSave')
            }
        }
    }
} 

function onPageClick(page: number) {
    currentStep.value = page
    setRef()
}

async function sortTravels(travelKey: string, timePeriod: TimePeriod, currentPage: number) {
    await travelsStore.setSort(travelKey, timePeriod, currentPage)
}

function onSelectTravel(travel: Travel) {
    selectedTravel.value = travel
    isFormValid.value = true
}

function checkCustomerFormValid(modalRef: any) {
    const keys = Object.keys(modalRef)
    let isValid = true
    for(const key of keys) {

        if(modalRef[key].value === '' || !!modalRef[key].error) {
            isValid = false
            return
        }
    }

    isFormValid.value = isValid

}

function updateCustomerValue(val:any, travelKey: string) {
    customerRef.value[travelKey].value = val

    if( travelKey === 'phoneNumber') {
        const phoneRegex = /^((([+]([0-9]{2}))|([0-9]{4}))[0-9]{9})$/g
        customerRef.value[travelKey].error = val.match(phoneRegex) ? undefined : 'Fill a valid phone number with landcode in'
    } else if(travelKey === 'email') {
        const emailRegex = /([\w\.\-_]+)?\w+@[\w-_]+(\.\w+){1,}/g
        customerRef.value[travelKey].error = val.match(emailRegex) ? undefined : 'Fill a valid email in'
    } else if(travelKey === 'birthDate') {
        const today = new Date()
        customerRef.value[travelKey].error = Number(formatDate(val, 'YYYYMMDD')) <= Number(formatDate(today.toString(), 'YYYYMMDD')) ? undefined : 'Fill a date in before today'
    }

    checkCustomerFormValid(customerRef.value)
}

function updatePaymentValue(val:any, travelKey: string) {
    paymentRef.value[travelKey].value = val

    if(paymentRef.value.paymentType.value === '' ) {
        isFormValid.value = false
    } else {
        isFormValid.value = true
    }
}

function updateValue(val: any, travelKey: string) {
    if(currentStep.value === 1) {
        updateCustomerValue(val, travelKey)
    }
    if(currentStep.value === 2) {
        updatePaymentValue(val, travelKey)
    }
}

function nextStep() {
    currentStep.value += 1
    isFormValid.value = false
    setRef()
}

function setRef() {
    activeRef.value = currentStep.value === 2 ? paymentRef.value : customerRef.value
}
</script>