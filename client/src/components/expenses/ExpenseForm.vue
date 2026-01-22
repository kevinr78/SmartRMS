<template>
  <form
    class="flex flex-col gap-4"
    name="new-expense-form"
    @submit.prevent="handleFormSubmit"
  >
    <div class="flex gap-2">
      <Input
        label="Title"
        type="text"
        placeholder="Enter amount"
        name="title"
        class="w-full"
        :is-required="true"
        v-model="title"
      >
        <template #icon>
          <Pencil size="16" />
        </template>
      </Input>
      <Input
        label="Amount"
        type="number"
        placeholder="40 "
        name="amount"
        class="w-full"
        :is-required="false"
        v-model="amount"
      >
        <template #icon>
          <Landmark size="16" />
        </template>
      </Input>
    </div>
    <div class="flex gap-2">
      <Input
        label="Date"
        type="date"
        name="expenseDate"
        class="w-1/2"
        :is-required="true"
        v-model="date"
      >
        <template #icon>
          <Pencil size="16" />
        </template>
      </Input>
      <div class="flex flex-col flex-1">
        <label
          class="label text-primary-text text-left ml-2 mb-3 font-semibold w-full"
        >
          Category
        </label>
        <select
          class="select w-full border-neutral-100"
          v-model="category"
          name="category"
        >
          <option disabled selected>Category</option>
          <option>Groceries</option>
          <option>Utilities</option>
          <option>Rent</option>
          <option>Supplies</option>
          <option>Entertainment</option>
          <option>Transportation</option>
          <option>Other</option>
        </select>
      </div>
    </div>
    <div class="flex flex-col flex-1">
      <label
        class="label text-primary-text text-left ml-2 mb-3 font-semibold w-full"
      >
        Split Method
      </label>
      <select
        class="select w-full border-neutral-100"
        v-model="splitMethod"
        name="splitMethod"
      >
        <option selected value="equal">Split Equally</option>
        <option value="custom">Custom</option>
      </select>
    </div>
    <div v-if="splitMethod === 'custom'">
      <input
        type="radio"
        v-model="radioInput"
        value="percentages"
        class="radio radio-sm"
        checked="checked"
      />
      <label
        for=""
        class="label text-primary-text text-left ml-2 mb-3 mr-2 font-semibold"
        >Percentage</label
      >
      <input
        type="radio"
        v-model="radioInput"
        class="radio radio-sm"
        value="exact"
      />
      <label
        for=""
        class="label text-primary-text text-left ml-2 mb-3 mr-2 font-semibold"
        >Exact</label
      >
      <div class="flex justify-between mb-4">
        <div>
          Total Split: {{ totalCustomSplit }}
          <span
            v-if="radioInput === 'percentage'"
            class="font-bold text-primary-text"
            >%</span
          >
        </div>
        <div v-if="amount && totalCustomSplit != '100'" class="text-warning">
          Split must equal to 100
        </div>
      </div>
      <p class="text-primary-text font-bold">Members:</p>
      <li
        class="list-none mb-2"
        v-for="(value, index) in authUser.household.members"
        :key="value.id"
      >
        <span class="font-semibold mr-4">{{ value.userId.fullName }}</span>
        <input
          class="input w-15"
          type="number"
          placeholder="0"
          v-model.number="splitDetails[value.id]"
        />
        <span
          v-if="radioInput === 'percentage'"
          class="ml-2 font-bold text-primary-text"
          >%</span
        >
      </li>
    </div>
    <Button variant="primary" type="submit" :is-loading="false">
      <template #text> Add Expense </template>
      <template #spinner></template>
    </Button>
  </form>
</template>
<script setup>
import Input from "../ui/Input.vue";
import Button from "../ui/Button.vue";
import { Pencil, Landmark } from "lucide-vue-next";
import useNotifications from "../../composables/useNotifications";
import api from "../../utils/axios";
import { useApi } from "../../composables/useApi";
import { useAuth } from "../../composables/useAuth";
import { useAuthStore } from "../../store/auth/auth";
import { computed, ref } from "vue";
import { getFormData } from "../../utils/fetch";

const { apiCall } = useApi();
const { showSuccessToast, showErrorToast } = useNotifications();
const { authUser } = useAuth();
console.log("Auth User in Expense Form:", authUser.value);
const showLoadingSpinner = ref(false);
const splitDetails = ref({});
const title = ref("");
const amount = ref(0);
const date = ref("");
const category = ref(null);
const radioInput = ref("percentages");
const splitMethod = ref("equal");

const emit = defineEmits(["updateEvent"]);

const consolidatedSplitDetails = computed(() => {
  return Object.entries(splitDetails.value).map(([memberId, amount]) => ({
    user: memberId,
    amount: amount ?? 0,
  }));
});

const totalCustomSplit = computed(() => {
  return Object.values(splitDetails.value).reduce(
    (sum, val) => sum + (val || 0),
    0
  );
});

async function handleFormSubmit(e) {
  try {
    const formData = {
      title: title.value,
      amount: amount.value,
      date: date.value,
      category: category.value,
      splitMethod: splitMethod.value === "equal" ? "equal" : radioInput.value,
    };
    formData.splitDetails = consolidatedSplitDetails.value;
    console.log("Form Data to be submitted:", formData);
    const response = await apiCall(() => api.post("/expense", formData), {
      successMessage: "Expense created successfully",
      loadingRef: showLoadingSpinner,
    });

    showSuccessToast(response?.data.message);
    emit("updateEvent", response?.data);
  } catch (error) {
    showErrorToast(error.message);
  } finally {
    showLoadingSpinner.value = false;
    document.getElementById("my_modal_1").close();
  }
}
</script>
