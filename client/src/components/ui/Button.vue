<template>
  <button
    @click="handleClick"
    class ="btn"
    :class="`btn-${variant}`"
    :disabled = "disabled"
    :name="name"
    role="button"
  >
    <div v-if="$slots.icon">
      <slot  name="icon"/>
    </div>
    <slot name="text">

    </slot>
    <slot name="spinner">
      <Spinner :showSpinner = "isLoading"/>
    </slot>
  </button>
</template>

<script setup>
import Spinner from './Spinner.vue';

 defineProps({
    variant:{
      type:String,
    },
    name:{
      required:false,
      type:String,
    },
    disabled:{
      type: Boolean,
      default:false
    },
    isLoading:{
      required:false,
      type:Boolean,
    },
  });

  const emit = defineEmits(['button-click']);

  function handleClick(e){
    emit('button-click', e)
  }
</script>