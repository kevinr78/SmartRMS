<template>
  <div class="w-full flex flex-col">
    <form
      method="POST"
      name="register-form"
      class="flex flex-col gap-3 mb-10"
      @submit.prevent="emit('submit-form', $event)"
    >
      <div class="flex gap-2">
        <Input
          label="First Name"
          type="text"
          class="w-full"
          placeholder="Enter your first name"
          name="firstName"
        >
          <template #icon> <Pencil :size="18" /> </template>
        </Input>
        <Input
          label="Last Name"
          type=""
          placeholder="Enter your last name"
          :show-icon="true"
          name="lastName"
          class="w-full"
        >
          <template #icon> <Pencil :size="18" /> </template>
        </Input>
      </div>
      <Input
        label="email"
        type="email"
        placeholder="Enter your email here"
        :show-icon="true"
        name="email"
        class="w-full"
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
      <Button class="w-full btn-primary" type="submit">
        <template #text> Create Account </template>
      </Button>
      <input type="hidden" value="register" />
    </form>
    <div class="">
      <div class="flex justify-between">
        <span class=""
          >Already have an account?
          <a
            href=""
            @click.prevent="
              emit('change-view', {
                changeViewTo: 'login',
              })
            "
          >
            Back to sign in
          </a>
        </span>
      </div>
    </div>
  </div>
</template>

<script setup>
import Input from "../Input.vue";
import Button from "../Button.vue";
import { Mail, Pencil, KeyRound } from "lucide-vue-next";

const emit = defineEmits(["change-view",'submit-form']);
</script>
