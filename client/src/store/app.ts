import { defineStore} from "pinia";
import {computed, ref} from 'vue';
import type { Notification, NotificationObject } from "../types/types";

export const useAppStore = defineStore('app' , () => {
  const isGlobalLoading  =ref<boolean>(false);
  const loadingMessage = ref<string>("");

  const sidebarOpen = ref<boolean>(true);
  const currentPage = ref<string>(window.location.pathname);

  const notifications = ref<Notification[]>([]);

  const setGlobalLoading = (loading: boolean, message: string) => {
    isGlobalLoading.value = loading;
    loadingMessage.value = message
  }

  const toggleSidebar = () =>{
    sidebarOpen.value = !sidebarOpen.value;
  }

  const addNotification = (notification: NotificationObject) => {
    notifications.value.push({
      id: new Date().getTime(),
      ...notification,
      createdAt: new Date()

    })
  };


  const currentPath = computed(() => {
    return currentPage.value.split("/")[-1]
  });

  return {
    isGlobalLoading,
    loadingMessage,
    sidebarOpen,
    currentPage,
    notifications,
    setGlobalLoading,
    addNotification,
    toggleSidebar,
    currentPath
  }
})