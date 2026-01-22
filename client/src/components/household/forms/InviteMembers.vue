<template>
  <form
    class="flex flex-col gap-4"
    name="invite-members-form"
    @submit.prevent="handleFormSubmit"
  >
    <Input
      label="Member Name"
      type="text"
      placeholder="Enter member name"
      name="name"
      class="w-full"
      :is-required="true"
      v-model="name"
    >
      <template #icon>
        <Pencil size="16" />
      </template>
    </Input>
    <Input
      label="Email"
      type="email"
      placeholder="janedoe@gmail.com"
      name="email"
      class="w-full"
      :is-required="true"
      v-model="email"
    >
      <template #icon>
        <Mail size="16" />
      </template>
    </Input>
    <div>
      <p class="text-sm text-gray-600">
        Click "Get Link" to generate an invite link that you can share with
        others to join your household.
      </p>
    </div>

    <div v-if="inviteLink" class="border-2border-primary">
      <span>
        {{ inviteLink }}
      </span>
      <Clipboard
        size="16"
        class="ml-2 cursor-pointer"
        @click="writeTextToClipboard(inviteLink)"
      />
    </div>
    <Button variant="primary" type="submit" :is-loading="false">
      <template #text> Get Link </template>
      <template #spinner></template>
    </Button>
  </form>
</template>

<script setup>
import Input from "../../ui/Input.vue";
import Button from "../../ui/Button.vue";
import { Pencil, Mail, Clipboard } from "lucide-vue-next";
import { ref } from "vue";
import useNotifications from "../../../composables/useNotifications";
import api from "../../../utils/axios";
import { useApi } from "../../../composables/useApi";

const { apiCall } = useApi();
const showLoadingSpinner = ref(false);
const { showSuccessToast, showErrorToast } = useNotifications();
const emit = defineEmits(["submit-form"]);
const name = ref("");
const email = ref("");
const inviteLink = ref("");

async function handleFormSubmit(e) {
  try {
    const response = await apiCall(() => api.get("/household/invite-link"), {
      successMessage: "Invite link receivied successfully",
      loadingRef: showLoadingSpinner,
    });
    inviteLink.value = response?.data.data.inviteLink.inviteLink;
  } catch (error) {
    showErrorToast(error.message);
  }
}

function writeTextToClipboard(text) {
  navigator.clipboard.writeText(text).then(
    () => {
      showSuccessToast("Invite link copied to clipboard!");
    },
    (err) => {
      showErrorToast("Failed to copy text: ", err);
    }
  );
}
</script>
