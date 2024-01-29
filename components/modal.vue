<template>
    <div class="relative z-10" aria-labelledby="modal-title" role="dialog" aria-modal="true">
    
        <div class="fixed inset-0 z-10 w-screen overflow-y-auto">

            <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" @click="emits('closeModal')"></div>

        <div class="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <div class="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-[44rem]">
            <div class="bg-white px-4 pb-4 pt-5 w-full sm:p-6 sm:pb-4">
                <div class="w-full sm:flex sm:items-start">

                    <div class="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-lime-200 sm:mx-0 sm:h-10 sm:w-10">
                        <slot name="icon"></slot>
                    </div>
                    <div class="w-full relative mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                            <h3 class="h-10 mr-4 flex items-center text-lg font-semibold leading-6 text-gray-900" id="modal-title"><slot name="title"></slot></h3>
                            <stepper v-if="pages && typeof currentStep === 'number'" :current-step="currentStep" :stepper="pages" @onPageClick="onPageClick"></stepper>

                        <div class="mt-2 w-full">
                            <slot name=content></slot>
                        </div>


                    </div>
                </div>
            </div>
            <div class="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                <slot name="buttons"></slot>
            </div>
            </div>
        </div>
        </div>
    </div>
</template>

<script setup lang="ts">
const props = defineProps<{
    pages?: Array<string>,
    currentStep?: number
}>()
const emits = defineEmits(['closeModal', 'onPageClick'])

function onPageClick(page: number) {
    emits('onPageClick', page)
}
</script>