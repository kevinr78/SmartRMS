<template>
  <div class="flex flex-col gap-8 w-full max-w-3xl pb-10">
    <div class="flex flex-col pb-2 text-center">
      <h2 class="text-2xl font-semibold text-primary">Household Preferences</h2>
      <p class="text-text-secondary text-sm mt-1 text-center">
        Manage financial and lifestyle rules for your home.
      </p>
    </div>

    <div class="flex flex-col gap-8 text-left">
      <section
        class="bg-primary-light rounded-xl p-6 flex flex-col gap-6 shadow-sm"
      >
        <h3 class="font-medium text-primary text-lg pb-2 text-center">
          Financial Settings
        </h3>

        <div class="form-control w-full">
          <label class="label justify-start pb-1">
            <span class="label-text font-medium text-text-main text-left"
              >Default Currency</span
            >
          </label>
          <select
            v-model="formSettings.currency"
            class="select w-full bg-base-main text-text-main focus:ring-2 focus:ring-primary outline-none shadow-sm text-left"
          >
            <option value="USD">USD ($)</option>
            <option value="EUR">EUR (€)</option>
            <option value="GBP">GBP (£)</option>
            <option value="CAD">CAD ($)</option>
          </select>
        </div>

        <div class="form-control w-full">
          <label class="label justify-start pb-1">
            <span class="label-text font-medium text-text-main text-left"
              >Default Expense Split</span
            >
          </label>
          <select
            v-model="formSettings.defaultExpenseSplit"
            class="select w-full bg-base-main text-text-main focus:ring-2 focus:ring-primary outline-none shadow-sm text-left"
          >
            <option value="equal">Split Equally</option>
            <option value="exact">Exact Amounts</option>
            <option value="percentage">By Percentage</option>
          </select>
        </div>

        <div class="divider my-0 opacity-50"></div>

        <div
          class="form-control flex flex-row items-start justify-between w-full text-left"
        >
          <div class="flex flex-col pr-4">
            <span class="label-text font-medium text-text-main text-left"
              >Require Expense Approval</span
            >
            <span class="text-xs text-text-secondary mt-1 text-left"
              >Admins must approve expenses before they are added to the
              balance.</span
            >
          </div>
          <input
            type="checkbox"
            v-model="formSettings.requireExpenseApproval"
            class="toggle toggle-primary mt-1"
          />
        </div>

        <div
          class="form-control flex flex-row items-start justify-between w-full mt-2 text-left"
        >
          <div class="flex flex-col pr-4">
            <span class="label-text font-medium text-text-main text-left"
              >Allow Guest Expenses</span
            >
            <span class="text-xs text-text-secondary mt-1 text-left"
              >Allow logging expenses for people outside the household.</span
            >
          </div>
          <input
            type="checkbox"
            v-model="formSettings.allowGuestExpenses"
            class="toggle toggle-primary mt-1"
          />
        </div>
      </section>

      <section
        class="bg-primary-light rounded-xl p-6 flex flex-col gap-6 shadow-sm"
      >
        <h3 class="font-medium text-primary text-lg pb-2 text-center">
          Lifestyle Settings
        </h3>

        <div class="form-control w-full">
          <label class="label justify-start pb-1">
            <span class="label-text font-medium text-text-main text-left"
              >Chore Rotation Day</span
            >
          </label>
          <select
            v-model="formSettings.choreRotationDay"
            class="select w-full bg-base-main text-text-main focus:ring-2 focus:ring-primary outline-none shadow-sm text-left capitalize"
          >
            <option v-for="day in daysOfWeek" :key="day" :value="day">
              {{ day }}
            </option>
          </select>
        </div>

        <div class="form-control w-full">
          <label class="label justify-start pb-1">
            <span class="label-text font-medium text-text-main text-left"
              >Quiet Hours Start</span
            >
          </label>
          <input
            type="time"
            v-model="formSettings.quietHoursStart"
            class="input w-full bg-base-main text-text-main focus:ring-2 focus:ring-primary outline-none shadow-sm text-left"
          />
        </div>

        <div class="form-control w-full">
          <label class="label justify-start pb-1">
            <span class="label-text font-medium text-text-main text-left"
              >Quiet Hours End</span
            >
          </label>
          <input
            type="time"
            v-model="formSettings.quietHoursEnd"
            class="input w-full bg-base-main text-text-main focus:ring-2 focus:ring-primary outline-none shadow-sm text-left"
          />
        </div>
      </section>
    </div>

    <div class="flex justify-end mt-4">
      <Button
        variant="primary"
        @button-click="savePreferences"
        class="w-full sm:w-auto px-8"
      >
        Save Preferences
      </Button>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from "vue";
import Button from "../../../ui/Button.vue";

const props = defineProps({
  householdData: {
    type: Object,
    required: true,
  },
});

const emit = defineEmits(["updateSettings"]);

const daysOfWeek = [
  "sunday",
  "monday",
  "tuesday",
  "wednesday",
  "thursday",
  "friday",
  "saturday",
];

const formSettings = ref({
  currency: "USD",
  choreRotationDay: "sunday",
  allowGuestExpenses: false,
  requireExpenseApproval: false,
  quietHoursStart: "22:00",
  quietHoursEnd: "07:00",
  defaultExpenseSplit: "equal",
  ...props.householdData?.settings,
});

watch(
  () => props.householdData.settings,
  (newSettings) => {
    if (newSettings) {
      formSettings.value = { ...formSettings.value, ...newSettings };
    }
  },
  { deep: true, immediate: true }
);

function savePreferences() {
  emit("updateSettings", {
    settings: formSettings.value,
  });
}
</script>
