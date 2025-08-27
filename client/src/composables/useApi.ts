import type {Ref} from 'vue';

export function useApi(){
  //const showError

  async function apiCall<T>(
    apiFunction:() => Promise<T>,
    options: {
      showErrorToast?: boolean
      loadingRef?: Ref<boolean>
      successMessage?: string
    } = {}
  ): Promise<T | null> {
    const { showErrorToast = true, loadingRef, successMessage} = options;
    if(loadingRef) {
      loadingRef.value = true;
    }

    try {
      const result = await apiFunction();
      if(successMessage) {
        //show Toast
      }

      return result;
    } catch (error: any) {
      if(showErrorToast) {
        const message = error.response?.data.message || "Something Went wrong";
        //showErrorToast(message);
      }
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