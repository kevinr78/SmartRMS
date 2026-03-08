import { defineStore } from "pinia";
import { computed, ref } from "vue";
import type { User } from "../../types/auth";
export const useAuthStore = defineStore("auth", () => {
  const savedUser = localStorage.getItem("user");
  const initialUser: User | null = savedUser ? JSON.parse(savedUser) : null;
  const user = ref<User | null>(initialUser);
  const accessToken = ref<string | null>(localStorage.getItem("accessToken"));
  const refreshToken = ref<string | null>(localStorage.getItem("refreshToken"));
  const isLoading = ref<boolean>(false);

  const isAuthenticated = computed<boolean>(
    () => !!user.value && !!accessToken.value
  );

  const setUser = (userData: any) => {
    user.value = userData;
    localStorage.setItem("user", JSON.stringify(userData));
  };

  const setAccessToken = (token: string) => {
    accessToken.value = token;
    localStorage.setItem("accessToken", token);
  };

  const setRefreshToken = (token: string) => {
    refreshToken.value = token;
    localStorage.setItem("refreshToken", token);
  };

  const clearAuth = () => {
    user.value = null;
    accessToken.value = null;
    refreshToken.value = null;
    localStorage.clear();
    window.location.href = "/";
  };

  return {
    user,
    accessToken,
    refreshToken,
    isAuthenticated,
    isLoading,
    setUser,
    clearAuth,
    setAccessToken,
    setRefreshToken,
  };
});
