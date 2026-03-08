import { ref } from "vue";

export function useApi() {
  const error = ref(null);

  /**
   * @param {Function} fn - The axios call: () => api.get(...)
   * @param {Object} options - { loadingRef, successMessage }
   */
  const apiCall = async (fn: Function, options: any = {}) => {
    const { loadingRef = null } = options;

    if (loadingRef) loadingRef.value = true;
    error.value = null;

    try {
      const response = await fn();
      return response;
    } catch (err: any) {
      // Extract the most relevant error message
      error.value =
        err.response?.data?.message || err.message || "Something went wrong";
      throw err; // Re-throw so the component can still handle specific logic if needed
    } finally {
      if (loadingRef) loadingRef.value = false;
    }
  };

  return { error, apiCall };
}
