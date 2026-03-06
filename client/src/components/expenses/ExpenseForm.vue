<template>
  <form
    class="flex flex-col gap-6 text-left"
    name="new-expense-form"
    @submit.prevent="handleFormSubmit"
  >
    <div class="text-center pb-2">
      <h3 class="text-xl font-semibold text-primary">
        {{ isEdit ? "Edit Expense" : "Add New Expense" }}
      </h3>
    </div>

    <div class="bg-primary-light rounded-xl p-6 flex flex-col gap-5 shadow-sm">
      <div class="flex flex-col sm:flex-row gap-4">
        <Input
          label="Title"
          type="text"
          placeholder="e.g., Grocery Shopping"
          name="title"
          class="w-full"
          :isRequired="true"
          v-model="title"
        >
          <template #icon><Pencil size="16" /></template>
        </Input>

        <Input
          label="Amount"
          type="number"
          placeholder="0.00"
          name="amount"
          class="w-full"
          :isRequired="true"
          v-model="amount"
        >
          <template #icon><Landmark size="16" /></template>
        </Input>
      </div>

      <div class="flex flex-col sm:flex-row gap-4">
        <Input
          label="Date"
          type="date"
          name="expenseDate"
          class="w-full"
          :isRequired="true"
          v-model="date"
        />

        <div class="form-control w-full">
          <label class="label justify-start pb-1">
            <span class="label-text font-medium text-text-main">Category</span>
          </label>
          <select
            v-model="category"
            class="select w-full bg-base-main text-text-main focus:ring-2 focus:ring-primary outline-none shadow-sm"
          >
            <option :value="null" disabled>Select Category</option>
            <option v-for="cat in categories" :key="cat" :value="cat">
              {{ cat }}
            </option>
          </select>
        </div>
      </div>

      <div class="form-control w-full">
        <label class="label justify-start pb-1">
          <span class="label-text font-medium text-text-main"
            >Split Method</span
          >
        </label>
        <select
          v-model="splitMethod"
          class="select w-full bg-base-main text-text-main focus:ring-2 focus:ring-primary outline-none shadow-sm"
        >
          <option value="equal">Split Equally</option>
          <option value="custom">Custom Split</option>
        </select>
      </div>

      <div
        v-if="splitMethod === 'custom'"
        class="flex flex-col gap-4 pt-2 animate-in fade-in slide-in-from-top-2"
      >
        <div
          class="flex items-center gap-6 pb-2 border-b border-border-light/50"
        >
          <label class="flex items-center gap-2 cursor-pointer">
            <input
              type="radio"
              v-model="radioInput"
              value="percentages"
              class="radio radio-primary radio-sm"
            />
            <span class="text-sm font-medium text-text-main"
              >Percentage (%)</span
            >
          </label>
          <label class="flex items-center gap-2 cursor-pointer">
            <input
              type="radio"
              v-model="radioInput"
              value="exact"
              class="radio radio-primary radio-sm"
            />
            <span class="text-sm font-medium text-text-main"
              >Exact Amount ($)</span
            >
          </label>
        </div>

        <div class="flex justify-between text-sm">
          <p class="text-text-secondary">
            Total Split:
            <span class="font-bold text-primary"
              >{{ totalCustomSplit
              }}{{ radioInput === "percentages" ? "%" : "$" }}</span
            >
          </p>
          <p
            v-if="radioInput === 'percentages' && totalCustomSplit !== 100"
            class="text-error font-medium"
          >
            Must equal 100%
          </p>
        </div>

        <ul class="flex flex-col gap-2">
          <li
            v-for="member in authUser.household.members"
            :key="member.userId._id"
            class="flex items-center justify-between bg-base-main p-3 rounded-lg shadow-sm"
          >
            <span class="text-sm font-medium text-text-main">{{
              member.userId.fullName
            }}</span>
            <div class="flex items-center gap-2">
              <input
                type="number"
                class="input input-sm w-20 bg-primary-light border-none text-right font-semibold"
                placeholder="0"
                v-model.number="splitDetails[member.userId._id]"
              />
              <span class="text-text-tertiary text-xs font-bold w-4">
                {{ radioInput === "percentages" ? "%" : "$" }}
              </span>
            </div>
          </li>
        </ul>
      </div>
    </div>

    <Button
      variant="primary"
      type="submit"
      :isLoading="showLoadingSpinner"
      class="w-full mt-2 py-3 shadow-md"
    >
      {{ isEdit ? "Update Expense" : "Add Expense" }}
    </Button>
  </form>
</template>

<script setup>
import { ref, computed, onMounted, useAttrs } from "vue";
import Input from "../ui/Input.vue";
import Button from "../ui/Button.vue";
import { Pencil, Landmark } from "lucide-vue-next";
import { useApi } from "../../composables/useApi";
import { useAuth } from "../../composables/useAuth";
import api from "../../utils/axios";

const attrs = useAttrs();
const { apiCall } = useApi();
const { authUser } = useAuth();

const showLoadingSpinner = ref(false);
const title = ref("");
const amount = ref(0);
const date = ref("");
const category = ref(null);
const splitMethod = ref("equal");
const radioInput = ref("percentages");
const splitDetails = ref({});

const categories = [
  "Groceries",
  "Utilities",
  "Rent",
  "Supplies",
  "Entertainment",
  "Transportation",
  "Other",
];
const emit = defineEmits(["updateEvent"]);

// Extract data from Modal attributes
const expenseData = computed(() => attrs.componentProperties?.expenseData);
const isEdit = computed(() => attrs.componentProperties?.isEdit || false);

const consolidatedSplitDetails = computed(() => {
  return Object.entries(splitDetails.value).map(([memberId, val]) => ({
    user: memberId,
    amount: val ?? 0,
  }));
});

const totalCustomSplit = computed(() => {
  return Object.values(splitDetails.value).reduce(
    (sum, val) => sum + (val || 0),
    0
  );
});

onMounted(() => {
  // Initialize members first
  if (authUser.value?.household?.members) {
    authUser.value.household.members.forEach((m) => {
      splitDetails.value[m.userId._id] = 0;
    });
  }

  // Pre-fill if editing
  if (isEdit.value && expenseData.value) {
    title.value = expenseData.value.title;
    amount.value = expenseData.value.amount;
    category.value = expenseData.value.category;
    if (expenseData.value.date)
      date.value = expenseData.value.date.split("T")[0];

    // Set split method
    if (expenseData.value.splitMethod !== "equal") {
      splitMethod.value = "custom";
      radioInput.value = expenseData.value.splitMethod;
      // Map existing splits
      expenseData.value.splitDetails?.amounts?.forEach((a) => {
        const userId = a.user._id || a.user;
        if (splitDetails.value[userId] !== undefined) {
          splitDetails.value[userId] = a.amount;
        }
      });
    }
  }
});
async function handleFormSubmit() {
  if (
    splitMethod.value === "custom" &&
    radioInput.value === "percentages" &&
    totalCustomSplit.value !== 100
  ) {
    return; // Optionally show a warning toast here
  }

  // Define the base payload
  const payload = {
    title: title.value,
    amount: amount.value,
    date: date.value,
    category: category.value,
    splitMethod: splitMethod.value === "equal" ? "equal" : radioInput.value,
    splitDetails: consolidatedSplitDetails.value,
  };

  const endpoint = isEdit.value
    ? `/expense/${expenseData.value._id}`
    : "/expense";
  const method = isEdit.value ? "patch" : "post";

  try {
    // When updating, the payload (our 'payload' object above)
    // strictly contains only the fields we defined, excluding _id.
    await apiCall(() => api[method](endpoint, payload), {
      successMessage: isEdit.value ? "Expense updated!" : "Expense created!",
      loadingRef: showLoadingSpinner,
    });

    emit("updateEvent");
    document.getElementById("my_modal_1").close();
  } catch (error) {
    console.error("Update failed:", error);
  }
}
</script>
