<template>
  <section class="p-5 shadow-md flex flex-col justify-between w-1/2 rounded-3xl">
    <header class="my-10">
      <h1 class="text-2xl font-bold">Create Your Account</h1>
    </header>
    <RegisterForm @changeView="(n) => emit('change-view', n)" @submitForm = "(eve) => emit('submit-form', eve)" />
  </section>
</template>
<script setup>
import RegisterForm from "../../ui/forms/RegisterForm.vue";
const emit = defineEmits(["change-view","submit-form"]);
</script>
<style scoped>
section:nth-of-type(1) {
  border-top:3px solid #a2acb9 ;
}
</style>