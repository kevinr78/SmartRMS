<template>
  <div class="flex flex-col gap-8 w-full max-w-3xl pb-10">
    <div class="flex flex-col pb-2 text-center">
      <h2 class="text-2xl font-semibold text-primary">General Settings</h2>
      <p class="text-text-secondary text-sm mt-1 text-center">
        Manage your basic household information.
      </p>
    </div>

    <form @submit.prevent="handleSubmit" class="flex flex-col gap-8 text-left">
      <section
        class="bg-primary-light rounded-xl p-6 flex flex-col gap-6 shadow-sm"
      >
        <h3 class="font-medium text-primary text-lg pb-2 text-center">
          Household Details
        </h3>

        <Input
          name="name"
          label="Household Name"
          :isRequired="true"
          placeholder="e.g., Chase House"
          type="text"
          v-model="formData.name"
        />

        <div class="form-control w-full">
          <label for="description" class="label justify-start pb-1">
            <span class="label-text font-medium text-text-main text-left"
              >House Description</span
            >
          </label>
          <textarea
            id="description"
            name="description"
            placeholder="Briefly describe your household..."
            class="textarea w-full bg-base-main text-text-main focus:ring-2 focus:ring-primary outline-none shadow-sm text-left resize-none h-24"
            v-model="formData.description"
          ></textarea>
        </div>

        <Input
          name="residents"
          label="Total Residents"
          :isRequired="true"
          placeholder="e.g., 3"
          type="number"
          v-model="formData.totalResidents"
        />

        <Input
          name="address"
          label="Address"
          :isRequired="false"
          placeholder="e.g., 123 Main St, New York, NY"
          type="text"
          v-model="formData.address"
        />
      </section>

      <div class="flex justify-end mt-4">
        <Button type="submit" variant="primary" class="w-full sm:w-auto px-8">
          Save Changes
        </Button>
      </div>
    </form>
  </div>
</template>

<script setup>
import Input from "../../../ui/Input.vue";
import Button from "../../../ui/Button.vue";
import { ref, watch } from "vue";

const emit = defineEmits(["updateSettings"]);
const props = defineProps({
  householdData: {
    type: Object,
    required: true,
    default: () => ({}),
  },
});

const formData = ref({
  name: "",
  description: "",
  totalResidents: 1,
  address: "", // Reverted to String to match the Mongoose schema
});

function handleSubmit() {
  const trackedChanges = {};

  // Only add fields that have actually been modified
  if (props.householdData.name !== formData.value.name) {
    trackedChanges.name = formData.value.name;
  }
  if (props.householdData.description !== formData.value.description) {
    trackedChanges.description = formData.value.description;
  }
  if (props.householdData.totalResidents !== formData.value.totalResidents) {
    trackedChanges.totalResidents = formData.value.totalResidents;
  }
  if (props.householdData.address !== formData.value.address) {
    trackedChanges.address = formData.value.address;
  }

  // Only emit if there are actual changes
  if (Object.keys(trackedChanges).length > 0) {
    emit("updateSettings", trackedChanges);
  }
}

// Populate the form when data is available
watch(
  () => props.householdData,
  (data) => {
    if (!data) return;

    formData.value = {
      name: data.name || "",
      description: data.description || "",
      totalResidents: data.totalResidents || 1,
      address: data.address || "",
    };
  },
  { immediate: true, deep: true }
);
</script>
