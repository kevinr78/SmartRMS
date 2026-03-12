<template>
  <div
    class="flex flex-wrap gap-3 items-center bg-primary-light/30 p-4 rounded-xl"
  >
    <Filter size="18" class="text-text-tertiary" />
    <select
      v-model="category"
      class="select select-sm bg-base-main border-none"
    >
      <option value="all">All Categories</option>
      <option v-for="{ value, text } in categories" :key="value" :value="value">
        {{ text }}
      </option>
    </select>
    <select
      v-model="statuses"
      class="select select-sm bg-base-main border-none"
    >
      <option v-for="opt in options" :key="opt.value" :value="opt.value">
        {{ opt.text }}
      </option>
    </select>
    <div class="hover:bg-base-main">
      <Button variant="ghost">
        <CircleX size="18" class="text-error" @click="clearFilters" />
      </Button>
    </div>
  </div>
</template>
<script setup>
import { CircleX, Filter } from "lucide-vue-next";
import { ref } from "vue";
import Button from "./Button.vue";

const category = defineModel("category");
const statuses = defineModel("statuses");
const props = defineProps({
  categories: {
    type: Array,
    required: true,
  },
  options: {
    type: Array,
    required: true,
  },
});

function clearFilters() {
  category.value = "all";
  statuses.value = "all";
}
</script>
