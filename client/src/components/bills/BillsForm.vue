<template>
  <form @submit.prevent="handleSubmit" class="flex flex-col gap-6 text-left">
    <div class="text-center pb-2">
      <h3 class="text-xl font-semibold text-primary">
        {{ isEdit ? "Edit Bill" : "Add New Bill" }}
      </h3>
    </div>
    <div class="bg-primary-light rounded-xl p-6 flex flex-col gap-5 shadow-sm">
      <Input label="Bill Title" v-model="formData.title" :isRequired="true" />

      <div class="flex gap-4">
        <Input
          label="Total Amount"
          type="number"
          v-model="formData.totalAmount"
          class="w-1/2"
        />
        <div class="form-control w-1/2">
          <label class="label"
            ><span class="label-text font-medium">Category</span></label
          >
          <select
            v-model="formData.category"
            class="select bg-base-main border-none shadow-sm"
          >
            <template
              v-for="{ value, text, showInForm } in CATEGORIES"
              :key="value"
            >
              <option :value="value" v-if="showInForm">
                {{ text }}
              </option>
            </template>
          </select>
        </div>
      </div>

      <div
        class="flex items-center justify-between p-3 bg-base-main rounded-lg shadow-sm"
      >
        <span class="text-sm font-medium">Recurring Bill?</span>
        <input
          type="checkbox"
          v-model="formData.isRecurring"
          class="toggle toggle-primary"
        />
      </div>

      <div
        v-if="formData.isRecurring"
        class="form-control animate-in fade-in slide-in-from-top-1 flex flex-col"
      >
        <label class="label">
          <span class="label-text font-medium">Frequency</span>
        </label>
        <select
          v-model="formData.frequency"
          class="select bg-base-main border-none shadow-sm w-full"
        >
          <template
            v-for="{ value, text, showInForm } in FREQUENCY"
            :key="value"
          >
            <option :value="value" v-if="showInForm">
              {{ text }}
            </option>
          </template>
        </select>
      </div>

      <div class="form-control">
        <label class="label">
          <span class="label-text font-medium"
            >Split with (Leave empty for all)</span
          >
        </label>
        <div class="grid grid-cols-2 gap-2">
          <label
            v-for="member in authUser.household.members"
            :key="member.userId._id"
            class="flex items-center gap-2 p-2 bg-base-main rounded-md cursor-pointer hover:bg-white transition-colors"
          >
            <input
              type="checkbox"
              :value="member.userId._id"
              v-model="formData.selectedMembers"
              class="checkbox checkbox-primary checkbox-sm"
            />
            <span class="text-xs">{{ member.userId.fullName }}</span>
          </label>
        </div>
      </div>

      <Input label="Due Date" type="date" v-model="formData.dueDate" />
    </div>

    <Button
      type="submit"
      variant="primary"
      :isLoading="isLoading"
      class="w-full py-3"
    >
      {{
        formData.isRecurring && isEdit
          ? "Edit Recurring Bill"
          : formData.isRecurring && !isEdit
          ? "Create Recurring Bill"
          : !formData.isRecurring && isEdit
          ? "Edit One-Time Bill"
          : "Create One-Time Bill"
      }}
    </Button>
  </form>
</template>

<script setup>
import { onMounted, ref, useAttrs, computed } from "vue";
import Input from "../ui/Input.vue";
import Button from "../ui/Button.vue";
import api from "../../utils/axios";
import { useApi } from "../../composables/useApi";
import { useAuth } from "../../composables/useAuth";
const { apiCall } = useApi();
import { CATEGORIES, FREQUENCY, OPTIONS } from "./constants";
const emit = defineEmits(["updateEvent"]);
const isLoading = ref(false);
const { authUser } = useAuth();
const attrs = useAttrs();
const billData = computed(() => attrs.componentProperties?.billData);
const isEdit = computed(() => attrs.componentProperties?.isEdit || false);
const formData = ref({
  title: "",
  totalAmount: 0,
  category: "Other",
  dueDate: "",
  isRecurring: false,
  frequency: "monthly",
  selectedMembers: [], // IDs of specific roommates
});
async function handleSubmit() {
  // 1. Determine method and URL
  const isEditMode = isEdit.value || attrs.componentProperties?.isEdit;
  const billId = attrs.componentProperties?.billData?._id;

  const method = isEditMode ? "patch" : "post";
  const url = isEditMode ? `/bills/${billId}` : "/bills";

  // 2. Prepare the payload
  // We extract only the fields the user can actually change
  const payload = {
    title: formData.value.title,
    totalAmount: formData.value.totalAmount,
    category: formData.value.category,
    dueDate: formData.value.dueDate,
    isRecurring: formData.value.isRecurring,
    frequency: formData.value.frequency,
    selectedMembers: formData.value.selectedMembers,
  };

  try {
    await apiCall(() => api[method](url, payload), {
      successMessage: isEditMode
        ? "Bill updated successfully!"
        : "Bill added successfully!",
      loadingRef: isLoading,
    });

    // 3. Notify parent to refresh list and close modal
    emit("updateEvent");

    const modal = document.getElementById("my_modal_1");
    if (modal) modal.close();
  } catch (error) {
    console.error(`Error ${isEditMode ? "updating" : "creating"} bill:`, error);
  }
}

onMounted(() => {
  // Pre-fill if editing
  if (isEdit.value && billData.value) {
    formData.value.title = billData.value.title;
    formData.value.totalAmount = billData.value.totalAmount;
    formData.value.isRecurring = billData.value.isRecurring;
    formData.value.category = billData.value.category;
    if (billData.value.dueDate) {
      formData.value.dueDate = billData.value.dueDate.split("T")[0];
    }

    // Set split method
    if (billData.value.splits) {
      billData.value.splits.forEach((split) => {
        formData.value.selectedMembers.push(split.user.id);
      });
    }
  }
});
</script>
