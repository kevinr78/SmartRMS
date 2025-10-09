<template>
  <!-- name of each tab group should be unique -->
  <div class="tabs tabs-box flex justify-between mb-4">
    <input
      type="radio"
      name="my_tabs_1"
      v-model="settingRadio"
      :class="computedClasses"
      aria-label="General"
      checked="true"
      value='general'
    />
    <input
      type="radio"
      name="my_tabs_1"
      v-model="settingRadio"
      :class="computedClasses"
      aria-label="House Rules"
      value='rules'
    />
    <input
      type="radio"
      name="my_tabs_1"
      v-model="settingRadio"
      :class="computedClasses"
      aria-label="Preferences"    
      value='references'
    />
  </div>   
    <component 
        :is="activeView" 
        :householdData="householdData"
        @update-household="handleUpdate"
    ></component>
</template>
<script setup>
import  { useApi } from "../../../../composables/useApi";
import api from "../../../../utils/axios";
import General from "./General.vue";
import Preferences from "./Preferences.vue";
import Rules from "./Rules.vue";
import { computed, onMounted, ref, markRaw } from "vue";

const settingRadio = ref('general');
const householdData = ref({});
const {apiCall} = useApi();

const components =  {
  'general' : General,
  'rules':Rules,
  'preferences':Preferences,
}

onMounted(async () => {
  try {
      const response = await apiCall(
        () => apiCall(() => api.get('/household/'))
      )
      if(response.data.data.household){
        householdData.value = response.data.data.household
      }
    } catch (error) {
      throw error
    }
});

const activeView = computed(() => {
  return components[settingRadio.value]
})

const computedClasses = computed(() => {
  return {
    '[--tab-bg:#422ad5] text-white':settingRadio === settingView,
    'tab':true

  }
})


async function handleUpdate(updatedData) {
    if (!householdData.value?._id) {
        showErrorToast('Household ID is missing.');
        return;
    }

    try {
        // Here you would make the API call to your backend to update the data
        console.log('Submitting updated data to backend:', updatedData);
        // const response = await api.patch(`/household/${householdData.value._id}`, updatedData);
        
        showSuccessToast('Household settings saved successfully!');

        // Optionally, refresh data after update
        fetchHousehold('/household/');

    } catch (error) {
        showErrorToast(error.message || 'Failed to save settings.');
    }
}
</script>
