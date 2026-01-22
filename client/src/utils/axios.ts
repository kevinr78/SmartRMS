import axios from "axios";
import { useAuthStore } from "../store/auth/auth";

const api = axios.create();

api.defaults.baseURL = import.meta.env.VITE_API_BASE_URL;
api.defaults.headers.common = {
  "Content-Type": "application/json",
};

api.defaults.timeout = 100000;
api.interceptors.request.use(
  (config) => {
    const { accessToken } = useAuthStore();
    const token = accessToken ?? null;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const { refreshToken, setAccessToken } = useAuthStore();
    if (!error.response) console.log(error.response);

    const originalRequest = error.config;
    switch (error?.response?.status ?? 500) {
      case 401:
        if (!originalRequest._retry) {
          originalRequest._retry = true;
          try {
            const refreshTokenFromStore = refreshToken;
            const { data } = await api.post("auth/refresh-token", {
              token: refreshTokenFromStore,
            });

            setAccessToken(data.accessToken);
            api.defaults.headers.common.Authorization = `Bearer ${data.accessToken}`;
            originalRequest.headers.Authorization = `Bearer ${data.accessToken}`;
            return api(originalRequest);
          } catch (error) {
            console.log("Session expired. PLease Login Again");
            localStorage.clear();
            window.location.href = "/";
          }
        }
        break;
      case 403:
        console.log("Forbidden");
        break;
      case 500:
        console.log("Server Error");
        break;
      default:
        console.error("API Error:", error.response?.data || error.message);
    }
    return Promise.reject(error);
  }
);
export default api;
