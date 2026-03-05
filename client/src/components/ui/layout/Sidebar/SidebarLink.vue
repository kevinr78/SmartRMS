<template>
  <li>
    <router-link
      :to="`/${link}`"
      class="group flex items-center rounded-xl p-3 w-full transition-all duration-200 hover:bg-primary-light hover:shadow-sm"
      active-class="bg-primary-light shadow-sm router-link-active"
    >
      <div
        class="bg-base-light p-2.5 rounded-lg lg:mr-4 group-hover:bg-white transition-colors shadow-sm group-[.router-link-active]:bg-white"
      >
        <slot name="icon">
          <Ban
            :size="22"
            class="text-text-secondary group-hover:text-primary transition-colors group-[.router-link-active]:text-primary"
          />
        </slot>
      </div>

      <div class="flex-col items-start hidden lg:flex">
        <p
          class="text-text-main font-medium group-hover:text-primary transition-colors group-[.router-link-active]:text-primary text-left"
        >
          {{ title }}
        </p>
        <p
          class="font-light text-xs text-text-secondary group-hover:text-primary/70 transition-colors hidden xl:block mt-0.5 text-left group-[.router-link-active]:text-primary/70"
        >
          {{ subTitle }}
        </p>
      </div>
    </router-link>
  </li>
</template>

<script setup lang="ts">
import { Ban } from "lucide-vue-next";
import { RouterLink } from "vue-router";

defineProps({
  title: {
    type: String,
    required: true,
  },
  subTitle: {
    type: String,
    required: true,
  },
  link: {
    type: String,
    required: true,
  },
});
</script>
