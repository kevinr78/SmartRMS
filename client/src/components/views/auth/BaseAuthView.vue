<template>
  <div class="flex justify-center items-center h-full bg-main">
    <Transition name="fade" mode="out-in">
      <component
        :is="view[currentView]"
        @changeView="(n) => changeView(n)"
        @submitForm="(e) => handleFormSubmit(e)"
        :isLoading="showLoadingSpinner"
      ></component>
    </Transition>
  </div>
</template>
<script setup>
import LoginView from "./LoginView.vue";
import RegisterView from "./RegisterView.vue";
import { nextTick, ref } from "vue";

import { useAuth } from "../../../composables/useAuth";
import useNotifications from "../../../composables/useNotifications";

const { login, register } = useAuth();
const { showErrorToast, showSuccessToast } = useNotifications();
import { useRouter } from "vue-router";

const router = useRouter();
const currentView = ref("login");
const showLoadingSpinner = ref(false);
const view = {
  login: LoginView,
  register: RegisterView,
};

function changeView({ changeViewTo }) {
  currentView.value = changeViewTo;
}

async function handleFormSubmit(e) {
  let response;
  showLoadingSpinner.value = true;
  try {
    const form = new FormData(e.currentTarget);
    const formValue = Object.fromEntries(form);
    const formType = formValue["form-type"];
    delete formValue["form-type"];
    if (formType === "login") {
      response = await login(formValue);
    } else {
      response = await register(formValue);
    }

    showSuccessToast(response.message);
    router.push({path:'/home'})
  } catch (error) {
  } finally {
    showLoadingSpinner.value = false;
  }
}
</script>

<style>
.fade-enter-active,
.fade-leave-active {
  transition: all 0.25s ease-in-out;
}

.fade-enter-from {
  opacity: 0;
  transform: translateX(-30px);
}


.fade-leave-to {
  opacity: 0;
  transform: translateX(30px);
}

a:hover {
  text-decoration: underline;
}
</style>
