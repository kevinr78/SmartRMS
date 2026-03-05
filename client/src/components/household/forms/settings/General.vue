<template>
  <form @submit="" class="flex gap-3 flex-col">
    <Input
      name="name"
      label="Household Name"
      :is-required="true"
      placeholder="Eg. Chase House"
      class="w-full"
      type="text"
      v-model="formData.name"
    />
    <div>
      <label
        for="description"
        class="label text-primary-text text-left ml-2 mb-3 font-medium w-full"
        >House Description
      </label>
      <textarea
        name="Description"
        class="input w-full outline-0 border-1 focus:outline-0 border-light-border rounded-md"
        type="textarea"
        v-model="formData.description"
      ></textarea>
    </div>
    <Input
      name="residents"
      label="Total Residents"
      :is-required="true"
      placeholder="Eg. 1"
      class="w-full"
      disabled="false"
      type="number"
      v-model="formData.totalResidents"
    />
    <Input
      name="address"
      :is-required="true"
      label="Address"
      placeholder="Eg. 123 Main St"
      class="w-full"
      type="text"
      v-model="formData.address"
    />
    <Button
      type="submit"
      variant="primary"
      class="w-full mt-2"
      @click.prevent="handleSubmit"
    >
      <template #text> Save Changes </template>
    </Button>
  </form>
</template>
<script setup>
import Input from "../../../ui/Input.vue";
import Button from "../../../ui/Button.vue";
import { computed, watch, ref, onMounted } from "vue";

const emit = defineEmits(["updateSettings"]);
const props = defineProps({
  householdData: {
    type: Object,
    required: false,
  },
});

const formData = ref({
  name: "",
  description: "",
  totalResidents: 0,
  address: {
    street: "",
    city: "",
    country: "",
  },
});

function handleSubmit() {
  const trackedChanges = {};
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

  emit("updateSettings", formData.value);
}

watch(
  () => props.householdData,
  (data) => {
    if (!data) return;

    Object.assign(formData.value, {
      name: data.name,
      description: data.description,
      totalResidents: data.totalResidents,
    });

    if (data.address) {
      Object.assign(formData.value.address, data.address);
    }
  },
  { immediate: true }
);
</script>
