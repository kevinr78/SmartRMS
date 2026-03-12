<template>
  <div class="flex flex-col gap-4">
    <header class="text-left text-xl font-bold text-primary">
      Bills For this Month
      <hr />
    </header>
    <div
      class="grid grid-cols-7 gap-1 text-center font-bold text-text-tertiary text-xs uppercase tracking-widest"
    >
      <div
        v-for="day in ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']"
        :key="day"
      >
        <span class="text-primary"> {{ day }}</span>
      </div>
    </div>

    <div class="grid grid-cols-7 grid-rows-5 gap-2 h-full">
      <div
        v-for="date in calendarDays"
        :key="date.toISOString()"
        class="bg-base-main min-h-[100px] rounded-lg p-2 flex flex-col gap-1 border border-border-light/20"
      >
        <span class="text-xs font-bold text-text-secondary">{{
          date.getDate()
        }}</span>

        <div
          v-for="item in getItemsForDate(date)"
          :key="item._id"
          @click="$emit('select', item)"
          class="text-[10px] p-1 rounded cursor-pointer truncate transition-transform hover:scale-105"
          :class="
            item.status === 'Fully Paid'
              ? 'bg-success/20 text-success'
              : 'bg-primary/20 text-primary'
          "
        >
          {{ item.title ?? item.name }}
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { Repeat } from "lucide-vue-next";
import { computed } from "vue";

const props = defineProps(["events"]);
const emit = defineEmits(["select"]);

// 1. Get current month/year context
const now = new Date();
const currentMonth = now.getMonth();
const currentYear = now.getFullYear();

// 2. Logic to generate the 35-42 days shown in a standard calendar grid
const calendarDays = computed(() => {
  const days = [];

  // Start at the first day of the current month
  const firstDayOfMonth = new Date(currentYear, currentMonth, 1);
  // Get the day of the week (0-6) to see how much padding we need at the start
  const startPadding = firstDayOfMonth.getDay();

  // Calculate the start date of the calendar grid (might be in the previous month)
  const startDate = new Date(firstDayOfMonth);
  startDate.setDate(startDate.getDate() - startPadding);

  // Fill exactly 42 days (6 weeks) to keep the grid consistent
  for (
    let i = 0;
    i < new Date(currentYear, currentMonth + 1, 0).getDate();
    i++
  ) {
    days.push(new Date(startDate));
    startDate.setDate(startDate.getDate() + 1);
  }

  return days;
});

// 3. Helper to filter events for a specific day
const getItemsForDate = (date) => {
  return props.events.filter((e) => {
    const dueDate = new Date(e.dueDate ?? e.deadline);
    return (
      dueDate.getDate() === date.getDate() &&
      dueDate.getMonth() === date.getMonth() &&
      dueDate.getFullYear() === date.getFullYear()
    );
  });
};
</script>
