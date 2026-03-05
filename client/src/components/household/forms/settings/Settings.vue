<template>
  <!-- name of each tab group should be unique -->
  <div class="tabs tabs-box flex justify-between mb-4">
    <button
      v-for="(_, tab) in components"
      :key="tab"
      name="my_tabs_1"
      :class="['tab', { 'bg-primary !text-white': currentTab === tab }]"
      type="radio"
      @click="currentTab = tab"
    >
      {{ tab }}
    </button>
  </div>
  <component
    :is="components[currentTab]"
    :householdData="householdData"
    @updateSettings="handleUpdate"
  ></component>
</template>
<script setup>
import { useApi } from "../../../../composables/useApi";
import api from "../../../../utils/axios";
import General from "./General.vue";
import Preferences from "./Preferences.vue";
import Rules from "./Rules.vue";
import { computed, onMounted, ref, markRaw, shallowRef } from "vue";
import useNotifications from "../../../../composables/useNotifications";

const { showErrorToast, showSuccessToast } = useNotifications();
defineEmits(["updateHoushold", "updateEvent", "updateSettings"]);
const props = defineProps({
  componentProperties: {
    type: Object,
    required: true,
  },
});

const components = {
  General,
  Rules,
  Preferences,
};
const currentTab = ref("General");
const householdData = ref({});
const { apiCall } = useApi();

onMounted(async () => {
  try {
    const response = await apiCall(() => api.get("/household/"));
    if (response.data.data.household) {
      householdData.value = response.data.data.household;
    }
  } catch (error) {
    throw error;
  }
});

const activeView = computed(() => {
  return components[settingRadio.value];
});

async function handleUpdate(updatedData) {
  if (!householdData.value?._id) {
    showErrorToast("Household ID is missing.");
    return;
  }

  try {
    const response = await apiCall(() =>
      api.patch(`/household/${householdData.value._id}`, updatedData)
    );

    showSuccessToast("Household settings saved successfully!");
    householdData.value = response.data.data.household;
    document.getElementById("my_modal_1").close();
  } catch (error) {
    showErrorToast(error.message || "Failed to save settings.");
    document.getElementById("my_modal_1").close();
  }
}
</script>
