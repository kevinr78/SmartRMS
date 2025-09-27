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
      :value="General"
    />
    <input
      type="radio"
      name="my_tabs_1"
      v-model="settingRadio"
      :class="computedClasses"
      aria-label="House Rules"
      :value="Rules"
    />
    <input
      type="radio"
      name="my_tabs_1"
      v-model="settingRadio"
      :class="computedClasses"
      aria-label="Preferences"
      :value="Preferences"
    />
  </div>
  <component :is="settingView" />
</template>
<script setup>
import General from "./General.vue";
import Preferences from "./Preferences.vue";
import Rules from "./Rules.vue";
import { computed, ref } from "vue";

const settingRadio = defineModel('settingRadio');
const settingView = ref(settingRadio);

const computedClasses = computed(() => {
  return {
    '[--tab-bg:#422ad5] text-white':settingRadio === settingView,
    'tab':true

  }
})
</script>
