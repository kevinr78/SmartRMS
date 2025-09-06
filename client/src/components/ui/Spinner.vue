<template>
  <span v-if="showSpinner" className="loading loading-spinner"></span>
</template>
<script setup>
  defineProps({
    showSpinner: {
      default: false,
    }
  })
</script>