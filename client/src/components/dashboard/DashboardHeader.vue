<template>
  <div class="flex flex-col flex-1">
    <h1 class="font-bold text-4xl text-left">Good Morning, Kevin!</h1>
    <p class="text-left">Here's what's happening at Kevin' Home</p>
  </div>
  <div class="flex-1 flex justify-center items-center">
    <Calendar class="mr-2" />
    {{ formattedDate }}
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";
import { Calendar } from "lucide-vue-next";

const today = ref<Date>(new Date());

console.log(today.value.toDateString());
console.log(today.value.toString());

const formattedDate = computed(() => {
  return new Intl.DateTimeFormat("en-us", {
    month: "long",
    day: "2-digit",
    weekday: "long",
    year: "numeric",
  }).format(today.value);
});
</script>
