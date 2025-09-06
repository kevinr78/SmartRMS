<template>
  <div class="w-full flex flex-col gap-10">
    <form
      method="POST"
      name="login-form"
      class="flex flex-col gap-3 items-center justify-center"
      @submit.prevent="emit('submit-form', $event)"
    >
      <Input
        label="Email"
        type="email"
        placeholder="Enter your email here"
        :show-icon="true"
        class="w-full"
        name="email"
      >
        <template #icon>
          <Mail :size="18" />
        </template>
      </Input>
      <Input
        label="Password"
        type="password"
        class="w-full"
        placeholder="Enter your password here"
        name="password"
      >
        <template #icon>
          <KeyRound :size="18" />
        </template>
      </Input>
      <Button class="w-full btn-primary" type="submit" :isLoading="isLoading">
        <template #text> Sign In </template>
        <template #spinner></template>
      </Button>
      <input type="hidden" name="form-type" value="login" />
    </form>
    <div class="">
      <div class="flex justify-between">
        <span class="text-grey-text">Forgot Password?</span>
        <span class="text-slate-text"
          >Need an Account?
          <a
            href=""
            @click.prevent="
              emit('change-view', {
                changeViewTo: 'register',
              })
            "
            class="text-slate-950"
            >Sign up</a
          >
        </span>
      </div>
    </div>
  </div>
</template>

<script setup>
import Input from "../Input.vue";
import Button from "../Button.vue";
import { Mail,KeyRound } from "lucide-vue-next";


const emit = defineEmits(["change-view",'submit-form']);
defineProps({
  isLoading:Boolean
})
</script>
