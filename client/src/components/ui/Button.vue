<template>
  <button
    :type="type"
    :name="name"
    :disabled="disabled || isLoading"
    @click="handleClick"
    class="btn text-white transition-colors duration-200 flex items-center justify-center gap-2"
    :class="[variantClass, { 'opacity-70 cursor-not-allowed': disabled }]"
  >
    <span v-if="isLoading" class="loading loading-spinner loading-sm"></span>

    <div v-if="$slots.icon && !isLoading" class="flex items-center">
      <slot name="icon" />
    </div>

    <slot>
      <span v-if="text">{{ text }}</span>
    </slot>
  </button>
</template>

<script setup lang="ts">
import { computed } from "vue";

const props = defineProps({
  variant: {
    type: String,
    default: "primary", // e.g., primary, secondary, accent, ghost, outline
  },
  type: {
    type: String as () => "button" | "submit" | "reset",
    default: "button",
  },
  name: {
    type: String,
    default: "",
  },
  text: {
    type: String,
    default: "",
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  isLoading: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(["button-click"]);

// Dynamically generate the DaisyUI class based on the variant prop
const variantClass = computed(() => {
  const baseClasses = {
    primary: "btn-primary bg-primary hover:bg-primary-focus border-none",
    secondary: "btn-secondary",
    outline:
      "btn-outline border-border-focus text-text-main hover:bg-base-light",
    ghost: "btn-ghost text-text-main",
    danger: "btn-error text-white",
  };
  return (
    baseClasses[props.variant as keyof typeof baseClasses] || "btn-primary"
  );
});

function handleClick(e: Event) {
  if (!props.disabled && !props.isLoading) {
    emit("button-click", e);
  }
}
</script>
