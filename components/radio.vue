<template>
    <div class="w-64">
         <label :for="formId" class="block font-medium leading-6 text-gray-900 capitalize">{{ title }}</label>
         <div class="relative mt-2 rounded-md shadow-sm">
             <div v-if="formId === 'price'" class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                 <span class="text-gray-500 sm:text-sm">
                     &euro;
                 </span>
             </div>
             <div v-for="(value, index) in values" class="flex justify-start mb-2 cursor-pointer">
                <input
                 :type="type" 
                 :name="formId" 
                 :id="index.toString()" 
                 class="block text-left rounded-md py-1.5 w-6 mr-4 text-gray-900 border-2 border-gray-300 placeholder:text-gray-400 
                 focus:ring-2 focus:ring-inset focus:ring-indigo-600 
                 sm:text-sm sm:leading-6 cursor-pointer
                 "
                 @change="updateValue(value)"
                 >
                <label class="cursor-pointer" :for="index.toString()">{{ value }}</label>

             </div>
             
         </div>
         <span v-if="error" class="text-red-500 text-sm">{{ error }}</span>
     </div>
 </template>
 
 <script setup lang="ts"> 
 const props = defineProps<{
     title: string,
     formId: string,
     type: string,
     values: Array<string>,
     error?: string,
     placeholder?: string,
 }>()
 
 const emits = defineEmits(['onUpdate'])
  
 function updateValue(value: string) {
     emits('onUpdate', value)
 }
 
 </script>