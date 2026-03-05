<template>
  <header
    class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 w-full pb-6"
  >
    <div class="flex flex-col flex-1 text-left">
      <h1
        class="text-2xl md:text-3xl font-bold text-text-main tracking-tight text-left"
      >
        Household Management
      </h1>
      <p class="text-text-secondary text-sm mt-1 text-left">
        Manage your household members and settings.
      </p>
    </div>

    <div class="flex-shrink-0 w-full sm:w-auto mt-2 sm:mt-0">
      <Button
        variant="primary"
        class="w-full sm:w-auto px-6 shadow-sm"
        @button-click="$emit('button-click', 'NewHousehold')"
      >
        <template #icon>
          <Plus size="18" />
        </template>
        Create Household
      </Button>
    </div>
  </header>
</template>

<script setup>
import Button from "../ui/Button.vue";
import { Plus } from "lucide-vue-next";

// Define emits for the parent component
const emit = defineEmits(["button-click"]);
</script>
