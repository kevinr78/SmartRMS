<template>
  <form @submit.prevent="handleSubmit" class="flex flex-col gap-6 text-left">
    <div class="text-center pb-2">
      <h3 class="text-xl font-semibold text-primary">
        {{ isEdit ? "Edit Chore" : "Add New Chore" }}
      </h3>
    </div>

    <div class="bg-primary-light rounded-xl p-6 flex flex-col gap-5 shadow-sm">
      <div class="flex flex-col sm:flex-row gap-4">
        <Input
          label="Chore Title"
          name="name"
          placeholder="e.g., Clean the Kitchen"
          v-model="formData.name"
          :isRequired="true"
          class="w-full"
        />

        <div class="form-control w-full">
          <label class="label justify-start pb-1">
            <span class="label-text font-medium text-text-main">Priority</span>
          </label>
          <select
            v-model="formData.priority"
            class="select w-full bg-base-main shadow-sm border-none focus:ring-2 focus:ring-primary"
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </div>
      </div>

      <div class="form-control w-full">
        <label class="label justify-start pb-1">
          <span class="label-text font-medium text-text-main"
            >Instructions</span
          >
        </label>
        <textarea
          v-model="formData.instructions"
          class="textarea w-full bg-base-main text-text-main focus:ring-2 focus:ring-primary outline-none shadow-sm h-24 border-none"
          placeholder="Add notes or specific instructions..."
        ></textarea>
      </div>

      <div class="flex flex-col sm:flex-row gap-4">
        <div class="form-control w-full">
          <label class="label justify-start pb-1">
            <span class="label-text font-medium text-text-main">Category</span>
          </label>
          <select
            v-model="formData.category"
            class="select w-full bg-base-main shadow-sm border-none focus:ring-2 focus:ring-primary"
          >
            <option value="cleaning">Cleaning</option>
            <option value="maintenance">Maintenance</option>
            <option value="shopping">Shopping</option>
            <option value="kitchen">Kitchen</option>
            <option value="bathroom">Bathroom</option>
            <option value="shopping">Laundry</option>
            <option value="pets">Pets</option>
            <option value="outdoor">Outdoor</option>
            <option value="other">Other</option>
          </select>
        </div>

        <div class="form-control w-full">
          <label class="label justify-start pb-1">
            <span class="label-text font-medium text-text-main">Assign To</span>
          </label>
          <select
            v-model="formData.assignedTo"
            class="select w-full bg-base-main shadow-sm border-none focus:ring-2 focus:ring-primary"
          >
            <option :value="null">Unassigned</option>
            <option
              v-for="member in householdMembers"
              :key="member.userId._id"
              :value="member.userId._id"
            >
              {{ member.userId.fullName }}
            </option>
          </select>
        </div>
      </div>

      <div class="flex flex-col sm:flex-row gap-4">
        <div class="form-control w-full">
          <label class="label justify-start pb-1">
            <span class="label-text font-medium text-text-main"
              >Repeats (Frequency)</span
            >
          </label>
          <select
            v-model="formData.frequency"
            class="select w-full bg-base-main shadow-sm border-none focus:ring-2 focus:ring-primary"
          >
            <option value="once">Once</option>
            <option value="daily">Daily</option>
            <option value="weekly">Weekly</option>
            <option value="bi-weekly">Bi-Weekly</option>
            <option value="monthly">Monthly</option>
          </select>
        </div>

        <Input
          label="Deadline"
          name="deadline"
          type="date"
          v-model="formData.deadline"
          class="w-full"
        />
      </div>
    </div>

    <Button
      type="submit"
      variant="primary"
      :isLoading="isLoading"
      class="w-full shadow-md py-3"
    >
      {{ isEdit ? "Update Chore" : "Create Chore" }}
    </Button>
  </form>
</template>

<script setup>
import { ref, onMounted, useAttrs } from "vue";
import Input from "../ui/Input.vue";
import Button from "../ui/Button.vue";
import { useAuth } from "../../composables/useAuth";
import { useApi } from "../../composables/useApi";
import api from "../../utils/axios";

const { authUser } = useAuth();
const { apiCall } = useApi();
const attrs = useAttrs();
const emit = defineEmits(["updateEvent"]);

const isEdit = ref(attrs.componentProperties?.isEdit || false);
const isLoading = ref(false);
const householdMembers = authUser.value?.household?.members || [];

const formData = ref({
  name: "",
  instructions: "",
  priority: "medium",
  category: "cleaning",
  assignedTo: null,
  frequency: "once",
  deadline: "",
});

onMounted(() => {
  const choreData = attrs.componentProperties?.choreData;
  if (isEdit.value && choreData) {
    formData.value = {
      name: choreData.name || "",
      instructions: choreData.instructions || "",
      priority: choreData.priority || "medium",
      category: choreData.category || "cleaning",
      assignedTo: choreData.assignedTo?._id || choreData.assignedTo || null,
      frequency: choreData.frequency || "once",
      deadline: choreData.deadline ? choreData.deadline.split("T")[0] : "",
    };
  }
});

async function handleSubmit() {
  console.log(formData.value);
  const method = isEdit.value ? "patch" : "post";
  const url = isEdit.value
    ? `/chores/${attrs.componentProperties.choreData._id}`
    : "/chores";

  try {
    await apiCall(() => api[method](url, formData.value), {
      successMessage: isEdit.value ? "Chore updated!" : "Chore created!",
      loadingRef: isLoading,
    });

    emit("updateEvent");
    document.getElementById("my_modal_1").close();
  } catch (error) {
    console.error("Failed to save chore:", error);
  }
}
</script>
