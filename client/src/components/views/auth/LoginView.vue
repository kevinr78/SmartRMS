<template>
  <section
    class="p-5 shadow-md flex flex-col justify-between gap-4 w-1/2 rounded-3xl "
  >
    <header class="my-5 ">
      <h1 class="text-2xl font-bold">Welcome to RoomSync</h1>
    </header>
    <LoginForm
      @changeView="(n) => emit('change-view', n)"
      @submitForm="(eve) => emit('submit-form', eve)"
      :isLoading="isLoading"
    />
  </section>
</template>

<script setup>
import LoginForm from "../../ui/forms/LoginForm.vue";
const emit = defineEmits(["change-view", "submit-form"]);
defineProps({
  isLoading:Boolean
})
</script>
<style scoped>
section:nth-of-type(1) {
  border-top:3px solid #a2acb9 ;
}
</style>