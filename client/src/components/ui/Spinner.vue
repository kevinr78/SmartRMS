<template>
  <span v-if="showSpinner" class="loading loading-spinner"></span>
</template>
<script setup>
  defineProps({
    showSpinner: {
      default: false,
    }
  })
</script>