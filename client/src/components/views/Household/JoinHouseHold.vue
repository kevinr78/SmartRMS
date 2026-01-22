<template>
  <main class="flex justify-center items-center h-full">
    <section>
      <div
        v-if="!hasError && showLoadingSpinner"
        class="flex flex-col items-center"
      >
        <div class="flex gap-4 justify-center">
          <span class="mb-4 text-lg font-bold">{{ message }}</span>
          <Spinner :show-spinner="showLoadingSpinner" />
        </div>
      </div>
      <div v-if="!hasError && !showLoadingSpinner">
        class="flex flex-col items-center" >
        <p class="mb-4 text-lg">{{ message }}</p>
      </div>
      <div v-else-if="hasError" class="flex flex-col items-center">
        <p class="mb-4 text-lg text-amber-500 font-bold">
          {{ message }}
        </p>
      </div>
    </section>
  </main>
</template>

<script setup>
import { useRoute } from "vue-router";
import api from "../../../utils/axios";
import { useApi } from "../../../composables/useApi";
import { ref } from "vue";
import Spinner from "../../ui/Spinner.vue";

import useNotifications from "../../../composables/useNotifications";

const route = useRoute();
const { apiCall } = useApi();
const inviteToken = route.params.token;
const showLoadingSpinner = ref(false);
const { showSuccesToast, showErrorToast } = useNotifications();
const hasError = ref(false);
const message = ref("Joining Household");

if (inviteToken) {
  joinHousehold();
} else {
  showErrorToast("Invite Token is missing.");
}

async function joinHousehold() {
  try {
    const response = await apiCall(
      () => api.post(`/household/accept-invite`, { token: inviteToken }),
      {
        successMessage: "Successfully joined the household!",
        loadingRef: showLoadingSpinner,
      }
    );

    message.value =
      "Successfully joined the household! You will be redirected to create/login to your account.";

    setTimeout(() => {
      window.location.href = "/?token=" + inviteToken;
    }, 5000);
  } catch (error) {
    if (error.status === 401) {
      message.value =
        " You need to login to join the household. Redirecting to login page...";
      setTimeout(() => {
        window.location.href = "/?token=" + inviteToken;
      }, 5000);
      return;
    }
    message.value =
      " Invalid or expired invitation link. Please request a new invite.";
    hasError.value = true;
  }
}
</script>
