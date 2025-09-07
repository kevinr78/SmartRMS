<template>
  <div>
    <li class=" group flex items-center hover:bg-blue-light-bg rounded-lg p-2 lg:w-[250px]">
      <div class="bg-light-grey-bg p-2 rounded-lg mr-3 group-hover:bg-light-blue">
        <slot name="icon">
         <!--  <Ban :size="26" color="#7b889c"/> -->
        </slot>
      </div>
      <div class="flex-col items-start hidden md:flex">
        <p class="text-primary-text group-hover:text-blue-bg">
          {{ props.title }}
        </p>
        <p class="font-light  text-secondary-text hidden xl:block">
          {{ props.subHeading }}
        </p>
      </div>
    </li>
  </div>
</template>

<script setup>
import { Ban } from 'lucide-vue-next';

const props = defineProps({
  title: {
    type: String,
    required: true
  },
  subHeading: 
    {
    type: String,
    required: true
  },
})
</script>