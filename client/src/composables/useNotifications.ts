import { toast, type ToastOptions } from "vue3-toastify";

export default function useNotifications() {
  const showSuccessToast = function (
    message: string,
    options: ToastOptions = {}
  ) {
    toast.success(message, options);
  };

  const showErrorToast = function (
    message: string = "An Unexpected error occured",
    options: ToastOptions = {}
  ) {
    toast.error(message, options);
  };
  const showWarningToast = function (
    message: string,
    options: ToastOptions = {}
  ) {
    toast.warning(message, options);
  };

  const showInfoToast = function (message: string, options: ToastOptions = {}) {
    toast.info(message, options);
  };
  const showLoadingToast = (message: string) => {
    return toast.info(message, {
      autoClose: false, // Don't auto-dismiss
      closeOnClick: false,
      icon: false, // We'll add a spinner
    });
  };

  return {
    showSuccessToast,
    showErrorToast,
    showWarningToast,
    showInfoToast,
    showLoadingToast,
  };
}
