<template>
  <div class="form-control w-full">
    <label v-if="label" :for="name" class="label pb-1">
      <span class="label-text text-text-primary font-medium">
        {{ label }} <span v-if="isRequired" class="text-error">*</span>
      </span>
    </label>

    <div class="relative flex items-center w-full">
      <div v-if="$slots.icon" class="absolute left-3 text-text-tertiary">
        <slot name="icon"></slot>
      </div>

      <input
        :id="name"
        :name="name"
        :type="type"
        :disabled="disabled"
        :placeholder="placeholder"
        :required="isRequired"
        v-model="inputModel"
        v-bind="$attrs"
        class="input input-bordered w-full bg-base-main border-border-light text-text-main focus:border-primary focus:ring-1 focus:ring-primary transition-colors duration-200"
        :class="[
          { 'pl-10': $slots.icon },
          { 'input-error border-error': hasError },
        ]"
      />
    </div>

    <label v-if="hasError && errorMessage" class="label pt-1">
      <span class="label-text-alt text-error">{{ errorMessage }}</span>
    </label>
  </div>
</template>

<script setup lang="ts">
// Automatically binds to v-model on the parent
const inputModel = defineModel<string | number>();

defineProps({
  label: {
    type: String,
    default: "",
  },
  name: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    default: "text", // Default to text so you don't always have to pass it
  },
  placeholder: {
    type: String,
    default: "",
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  isRequired: {
    type: Boolean,
    default: false,
  },
  hasError: {
    type: Boolean,
    default: false,
  },
  errorMessage: {
    type: String,
    default: "",
  },
});
</script>

<script lang="ts">
export default {
  inheritAttrs: false,
};
</script>
