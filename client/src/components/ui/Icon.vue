<template>
  <div class="bg-light-grey-bg p-2 rounded-lg mr-3 group-hover:bg-light-blue ">
    <slot>
      <Ban :size="26" color="#7b889c" />
    </slot>
  </div>
</template>
<script setup>
import { Ban } from 'lucide-vue-next';
</script>