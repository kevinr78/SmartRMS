import { storeToRefs } from "pinia";
import {computed} from 'vue'
import { useAuthStore } from "../store/auth/auth";
import api from "../utils/axios";
import type { LoginCredentials, RegisterData } from "../types/auth";
import { useApi } from "./useApi";
import type { User } from "../types/auth";

export function useAuth(){
  const {apiCall} = useApi();
  const authStore = useAuthStore();
  const {user, isAuthenticated, isLoading} = storeToRefs(authStore);
  const {setUser, setTokens} = authStore;
  const authUser = computed(() => user);
  const userRole = computed<string>(() => user.value?.role || "resident");
  const hasHouseHold = computed<string | undefined>(() => user.value?.household);
  const isAuthenticatedUser = computed(() => isAuthenticated)

  const login = async function (credentials: LoginCredentials) {
    try {
      const response =await  apiCall(
        () => api.post('/auth/login', {credentials}),
        {successMessage: "Welcome Back!"}
      )
      setUser(response?.data.user);
      setTokens(response?.data.accessToken, response?.data.refreshToken);

      //navigate to dash

      return response?.data
    } catch (error) {
      throw error;
    } finally {
      isLoading.value = false;
    }
  };

  const register = async function (userData: RegisterData) {
    try {
      await apiCall(
        () => api.post('/auth/register', {userData}),
        {successMessage: 'Account Created!'}
      )
      //navigate to dash if okay else
    } catch (error) {
      
    }
  }
  const logout = function(){
    authStore.clearAuth();
    //navigate to somehwere
  }

  return {
    authUser,
    userRole,
    hasHouseHold,
    isAuthenticatedUser,
    login,
    logout
  }
}