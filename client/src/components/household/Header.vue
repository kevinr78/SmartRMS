<template>
  <div class="flex flex-col flex-1">
    <h1 class="text-xl font-bold md:text-2xl lg:text-4xl text-left">Household Management</h1>
    <p class="text-left">Manage your household members and settings</p>
  </div>
  <div class="flex-1 flex justify-center items-center">
    <Button variant ="primary" @buttonClick="$emit('button-click','NewHousehold')">
      <template #text>
        Create Household
      </template>
      <template #icon>
        <Plus />
      </template>
    </Button>
  </div>
</template>

<script setup>
import Button from '../ui/Button.vue';
import { Plus } from 'lucide-vue-next';
import Modal from '../ui/Modal.vue';

const emit = defineEmits(['button-click'])
</script>
