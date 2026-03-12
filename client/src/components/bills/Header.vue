<template>
  <header
    class="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 mb-8"
  >
    <div class="text-left">
      <h2 class="text-2xl font-bold text-text-main">Bills Management</h2>
      <p class="text-text-secondary text-sm">
        Maintain all your bills in one place!
      </p>
    </div>

    <div class="flex flex-col sm:flex-row items-center gap-4 w-full lg:w-auto">
      <div class="relative w-full sm:w-64">
        <Search
          class="absolute left-3 top-1/2 -translate-y-1/2 text-error"
          size="18"
        />

        <input
          type="text"
          placeholder="Search bills..."
          class="input w-full pl-10 bg-primary-light border-none shadow-sm text-"
          v-model="search"
        />
        <CircleX
          size="18"
          class="text-error absolute right-3 top-1/2 -translate-y-1/2 hover:bg-base-main"
          @click="search = ''"
        />
      </div>

      <div class="flex bg-primary-light p-1 rounded-xl shadow-sm">
        <button
          @click="emit('toggleView', 'list')"
          class="p-2 rounded-lg transition-all"
          :class="
            currentView === 'list'
              ? 'bg-white text-primary shadow-sm'
              : 'text-text-tertiary hover:text-text-main'
          "
        >
          <LayoutGrid size="18" />
        </button>
        <button
          @click="emit('toggleView', 'calendar')"
          class="p-2 rounded-lg transition-all"
          :class="
            currentView === 'calendar'
              ? 'bg-white text-primary shadow-sm'
              : 'text-text-tertiary hover:text-text-main'
          "
        >
          <CalendarIcon size="18" />
        </button>
      </div>

      <Button
        variant="primary"
        @button-click="emit('changeModal')"
        class="px-6 shadow-md w-full sm:w-auto"
      >
        <template #icon><Plus size="18" /></template>
        Add Bill
      </Button>
    </div>
  </header>
</template>

<script setup>
import {
  Plus,
  Search,
  LayoutGrid,
  Calendar as CalendarIcon,
  CircleX,
} from "lucide-vue-next";
import Button from "../ui/Button.vue";
const search = defineModel("search");
const props = defineProps({
  currentView: {
    type: String,
    default: "list",
  },
});

const emit = defineEmits(["changeModal", "search", "toggleView"]);
</script>
