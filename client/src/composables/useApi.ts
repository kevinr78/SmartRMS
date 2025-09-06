import type {Ref} from 'vue';
import useNotifications from './useNotifications';
export function useApi(){
  //const showError
  const {showErrorToast} = useNotifications();


  async function apiCall<T>(
    apiFunction:() => Promise<T>,
    options: {
      showErrorToast?: boolean
      loadingRef?: Ref<boolean>
      successMessage?: string
    } = {}
  ): Promise<T | null> {
    
    const {loadingRef, successMessage} = options;
    if(loadingRef) {
      loadingRef.value = true;
    }

    try {
      const result = await apiFunction();
      return result;
    } catch (error: any) {
        const message = error.response?.data.message || "Something Went wrong";
        showErrorToast(message);
        throw error;
    }finally{
      if(loadingRef) {
        loadingRef.value = false;
      }
    }
  }

  return {
    apiCall
  }
}