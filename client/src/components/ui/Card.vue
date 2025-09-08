<template>
  <div class="bg-base-100 rounded-xl shadow p-6 border-2 " :class="[variantClasses.bgClass, variantClasses.borderClass]">
    <div class="flex items-start justify-between">
      <!-- The title of the card -->
      <div class="flex flex-col">
        <h3 class="text-text-secondary font-medium text-primary-text">{{ title }}</h3>
        <!-- The main value, formatted to be large and bold -->
        <p class="text-3xl text-left font-bold   mt-2">{{ value }}</p>
      </div>
      <div 
        v-if="icon"
        class="p-2 rounded-lg" 
        :class="[variantClasses.iconBgClass, variantClasses.iconTextColorClass]"
      >
        <!-- The 'is' attribute dynamically renders the component passed in the 'icon' prop -->
        <component :is="icon" :size="24" />
      </div>
      <div 
        v-if="$slots.details"
        class="text-2xl font-bold"
        >
        $0.00
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, type PropType, type Component } from 'vue';

// Define the props the component accepts
const props = defineProps({
  title: {
    type: String,
    required: true,
  },
  value: {
    type: [String, Number],
    required: true,
  },
  // We accept a Vue component as a prop for the icon
  icon: {
    type: Object as PropType<Component>,
  },
  // The 'variant' prop controls the color scheme
  variant: {
    type: String as PropType<'primary' | 'success' | 'warning' | 'error'>,
    default: 'primary',
  },
});

// A computed property to determine the correct CSS classes based on the variant
const variantClasses = computed(() => {
  switch (props.variant) {
    case 'success':
      return {
        bgClass: 'bg-success/10',
        iconBgClass: 'bg-success',
        textContentClass:'text-success-content',
        borderClass:'border-success-content/15',
        iconTextColorClass: 'text-success-content',
      };
    case 'warning':
      return {
        bgClass: 'bg-warning/10',
        iconBgClass: 'bg-warning',
        textContentClass:'text-warning-content',
        borderClass:'border-warning-content/15',
        iconTextColorClass: 'text-warning-content',
      };
    case 'error':
      return {
        bgClass: 'bg-error/10',
        iconBgClass: 'bg-error',
        textContentClass:'text-error-content',
        borderClass:'border-error-content/15',
        iconTextColorClass: 'text-error-content',
      };
    default: // 'primary'
      return {
        bgClass: 'bg-primary/10',
        iconBgClass: 'bg-primary',
        textContentClass:'text-primary-content',
        borderClass:'border-primary-content/15',
        iconTextColorClass: 'text-primary-content',
      };
  }
});
</script>

