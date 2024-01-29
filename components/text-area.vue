<template>
    <div v-if="!hidden" class="w-64">
         <label :for="formId" class="block font-medium leading-6 text-gray-900 capitalize">{{ title }}</label>
         <div class="relative mt-2 rounded-md shadow-sm">
             <div v-if="formId === 'price'" class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                 <span class="text-gray-500 sm:text-sm">
                     &euro;
                 </span>
             </div>
             <textarea 
                 v-model="inputValue" 
                 :name="formId" 
                 :id="formId" 
                 :class="{'border-pink-500 text-pink-600 focus:border-pink-500 focus:ring-pink-500': !!error}"
                 class="block w-64 rounded-md py-1.5 pl-7 pr-4 text-gray-900 border-2 border-gray-300 placeholder:text-gray-400 
                 focus:ring-2 focus:ring-inset focus:ring-indigo-600 
                 sm:text-sm sm:leading-6"
                 :placeholder="placeholder" 
                 @change="updateValue"
                 >
             </textarea>
         </div>
         <span v-if="error" class="text-red-500 text-sm">{{ error }}</span>
     </div>
 </template>
 
 <script setup lang="ts">
 import { formatDate } from '~/utils';
 
 const props = defineProps<{
     title: string,
     formId: string,
     type: string,
     error?: string,
     placeholder?: string,
     value?: string | number| Date | undefined,
     hidden?: boolean
 }>()
 
 const emits = defineEmits(['onUpdate'])
 
 const inputValue = ref('')
 
 function updateValue() {
     emits('onUpdate', inputValue.value)
 }
 
 </script>