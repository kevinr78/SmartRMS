<template>
  <div class="cursor-pointer">
    <router-link :to="`/${link}`">
        <li
        class="group flex items-center hover:bg-blue-light-bg rounded-lg p-2 w-full xl:w-[250px]"
        >
        <div
          class="bg-light-grey-bg p-2 rounded-lg mr-3 group-hover:bg-light-blue "
        >
          <slot name="icon">
            <Ban :size="26" color="#7b889c" />
          </slot>
        </div>
        <div class="flex-col items-start hidden md:flex cursor-pointer">
          <p class="text-primary-text group-hover:text-blue-bg cursor-pointer">
            {{ props.title }}
          </p>
          <p class="font-light text-secondary-text hidden xl:block cursor-pointer">
            {{ props.subTitle }}
          </p>
        </div>
      </li>
      </router-link>
  </div>
</template>

<script setup lang="ts">
import { Ban } from "lucide-vue-next";
import { RouterLink } from "vue-router";
const props = defineProps({
  title: {
    type: String,
    required: true,
  },
  subTitle: {
    type: String,
    required: true,
  },
  link:{
    type: String,
    required:true

  }
});
</script>
