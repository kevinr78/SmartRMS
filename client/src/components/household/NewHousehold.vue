<template>
  <form
    class="flex flex-col gap-4"
    name="new-household-form"
    @submit.prevent="handleFormSubmit"
  >
    <Input
      label="Household Name"
      type="text"
      placeholder="Enter your house name"
      name="name"
      class="w-full"
      :is-required="true"
    >
      <template #icon>
        <Pencil size="16" />
      </template>
    </Input>
    <Input
      label="Address (optional) "
      type="text"
      placeholder="Eg. 123 Main St., FL 1, Harrison, NJ 07029 "
      name="address"
      class="w-full"
      :is-required="false"
    >
      <template #icon>
        <Landmark size="16" />
      </template>
    </Input>
    <Button variant="primary" type="submit" :is-loading="false">
      <template #text> Save </template>
      <template #spinner></template>
    </Button>
  </form>
</template>

<script setup>
import Input from "../ui/Input.vue";
import Button from "../ui/Button.vue";
import { Pencil, Landmark } from "lucide-vue-next";
import NewHousehold from "./NewHousehold.vue";
import useNotifications from "../../composables/useNotifications";
import api from "../../utils/axios";
import { useApi } from "../../composables/useApi";
import { ref } from "vue";
import { getFormData } from "../../utils/fetch";
const { apiCall } = useApi();
const { showSuccessToast, showErrorToast } = useNotifications();

const showLoadingSpinner = ref(false);
const emit = defineEmits(["updateHoushold"]);

async function handleFormSubmit(e) {
  try {
    const formData = getFormData(e);
    const response = await apiCall(() => api.post("/household", formData), {
      successMessage: "Household created successfully",
      loadingRef: showLoadingSpinner,
    });

    showSuccessToast(response?.data.message);
    emit("updateHoushold", response?.data);
  } catch (error) {
    showErrorToast(error.message);
  } finally {
    showLoadingSpinner.value = false;
    document.getElementById("my_modal_1").close();
  }
}
</script>
