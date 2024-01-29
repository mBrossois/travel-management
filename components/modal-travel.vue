<template>
    <modal @closeModal="emits('onCancel')">
        <template #icon>
            <img class="h-6" :src="imgSrc">
        </template>
        <template #title>
            {{ title }}
        </template>
        <template #content>
            <div class="flex gap-8 flex-wrap justify-start">
                <input-block v-for="(travelKey, index) in travelRef" 
                    :title="travelKey.title" 
                    :form-id="index.toString()" 
                    :type="travelKey.type" 
                    :error="travelKey.error" 
                    :placeholder="travelKey.placeholder" 
                    :value="travelKey.value" 
                    :hidden="travelKey.hidden" 
                    @on-update="updateValue($event, index.toString())">
                </input-block>
            </div>
        </template>
        <template #buttons>

            <button type="button" :disabled="!isFormValid" class="inline-flex w-full justify-center rounded-md bg-green-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-500 sm:ml-3 sm:w-auto disabled:bg-gray-300 disabled:text-gray-600" @click="emits('onSave', getUpdatedTravel())">{{ confirmButton }}</button>
            <button type="button" class="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto" @click="emits('onCancel')">Cancel</button>
        </template>
    </modal>
</template>

<script setup lang="ts">
import type { Travel } from '~/types/travels';

const props = defineProps({
    title: String,
    confirmButton: String,
    imgSrc: String,
    travel: Object as () => Travel
})

const emits = defineEmits(['onSave', 'onCancel'])

const isFormValid = ref(true)

function getUpdatedTravel() {
    const travelKeys = Object.keys(travelRef.value);
    let newTravel: {[keys: string]: any} = {}
    for(let i of travelKeys) {
        newTravel[i] = travelRef.value[i].value
    }

    return newTravel
}

const travelRef: Ref<{[key: string]: { value: any, title: string, type: string, error?: string, placeholder?: string, hidden?: boolean}}> = 
    ref(
        {
            id: { value: props.travel?.id ?? -1, title: 'id', type: 'number', hidden: true},
            name: { value: props.travel?.name ?? '', type: 'string', title: 'travel name', placeholder: 'Travel name'},
            description: { value: props.travel?.description ?? '', type: 'string', title: 'travel description', placeholder: 'Travel description'},
            imgSrc: { value: props.travel?.imgSrc ?? '', type: 'string', title: 'image', placeholder: 'Image'},
            imgAlt: { value: props.travel?.imgAlt ?? '', type: 'string', title: 'Image alternative', placeholder: 'Description of image'},
            departureDate: { value: props.travel?.departureDate ?? '', type: 'Date', title: 'departure date'},
            returnDate: { value: props.travel?.returnDate ?? '', type: 'Date', title: 'return date'},
            pricePerTicket: { value: props.travel?.pricePerTicket ?? 0.01, type: 'number', title: 'price per ticket', placeholder: '0.00'},
        }
    )

function updateValue(val: any, travelKey: string) {
    travelRef.value[travelKey].value = val

    if( (travelKey === 'departureDate' || travelKey === 'returnDate') && Number(formatDate(travelRef.value.departureDate.value, 'YYYYMMDD')) >= Number(formatDate(travelRef.value.returnDate.value, 'YYYYMMDD'))) {
        travelRef.value.departureDate.error = 'The departure date should be before the return date'
        travelRef.value.returnDate.error = 'The departure date should be before the return date'
    } else if(travelKey === 'departureDate' || travelKey === 'returnDate') {
        travelRef.value.departureDate.error = undefined
        travelRef.value.returnDate.error = undefined
    }

    if( travelKey === 'pricePerTicket' && travelRef.value.pricePerTicket.value > 0 ) {
        travelRef.value.pricePerTicket.error = undefined
    } else if(travelKey === 'pricePerTicket') {
        travelRef.value.pricePerTicket.error = 'The price can not be lower then 0.01'
    }

    isFormValid.value = (!travelRef.value.departureDate.error && !travelRef.value.returnDate.error && !travelRef.value.pricePerTicket.error)
}
</script>