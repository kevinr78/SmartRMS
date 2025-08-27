import { defineStore } from "pinia";
import { computed, ref } from "vue";

import type { User } from "../../types/auth";

export const useAuthStore = defineStore("auth", () => {
  const user = ref<User | null>(null);
  const accessToken = ref<string | null>(localStorage.getItem("accessToken"));
  const refreshToken = ref<string | null>(localStorage.getItem("refreshToken"));
  const isLoading = ref<boolean>(false);

  const isAuthenticated = computed<boolean>(() => !!user.value && !!accessToken.value);
  const setUser = (userData: User) => {
    user.value = userData
  }

  const setTokens = (token: string, refresh: string) => {
    accessToken.value = token
    refreshToken.value = refresh
    localStorage.setItem('token', accessToken.value)
    localStorage.setItem('refreshToken', refresh)
  }

  const clearAuth = () => {
    user.value = null
    accessToken.value = null
    refreshToken.value = null
    localStorage.clear();
  }
  

  return {
    user,
    accessToken,
    refreshToken,
    isAuthenticated,
    isLoading,
    setUser,
    clearAuth,
    setTokens
  }
});
