<template>
  <div class="input-container">
    <label
      :for="name"
      class="label text-primary-text text-left ml-2 mb-2 font-medium w-full"
    >
      {{ label }}
    </label>
    <div
      class="flex border-1 border-light-border rounded-md items-center bg-white"
    >
      <div class="opacity-50 ml-2">
        <slot name="icon"> </slot>
      </div>
      <input
        v-model="inputModel"
        :type="type"
        class="input outline-0 w-full border-0 focus:outline-0"
        :placeholder="placeholder"
        :disabled="disabled"
        :name="name"
        :required="isRequired"
      />
    </div>
    <p v-show="hasError" class="label">{{ errorMessage }}</p>
  </div>
</template>
<script setup lang="ts">
const inputModel = defineModel();

defineProps({
  label: {
    type: String,
  },
  type: {
    type: String,
    required: true,
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  placeholder: {
    type: String,
    requried: true,
  },
  hasError: {
    type: Boolean,
  },
  errorMessage: {
    type: String,
  },
  showIcon: {
    type: Boolean,
    default: false,
  },
  name: {
    type: String,
    required: true,
  },
  isRequired: {
    type: Boolean,
    required: true,
  },
  value: {
    type: String,
    required: false,
  },
});
</script>

<style></style>
