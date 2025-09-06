<template>
  <div class="input-container  input">
    <label for="" class="labe" >
      <div class="opacity-50 ml-2">
        <slot name="icon" >
        </slot>
      </div>
    </label>

      <input
        v-model="inputModel"
        :type="type"
        class="input outline-0 w-full"
        :placeholder="placeholder"
        :disabled="disabled"
        :name="name"
      />
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
    default: false
  }, 
  name: {
    type: String,
    required: true
  }
});
</script>

<style>

input{
  border:0;
}
input:focus,
.input-container:focus {
  border: none;
  outline: none;
}
</style>
