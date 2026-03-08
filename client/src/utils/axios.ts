import axios from "axios";
import { useAuthStore } from "../store/auth/auth";

const api = axios.create();

api.defaults.baseURL = import.meta.env.VITE_API_BASE_URL;
api.defaults.headers.common = {
  "Content-Type": "application/json",
};

let isRefreshing = false;
let failedQueue: Array<any> = [];

const processQueue = (error: any, token = null) => {
  failedQueue.forEach((prom) => {
    if (error) prom.reject(error);
    else prom.resolve(token);
  });
  failedQueue = [];
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
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({
            resolve: (token: string) => {
              originalRequest.headers.Authorization = `Bearer ${token}`;
              resolve(api(originalRequest));
            },
            reject,
          });
        });
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        const { refreshToken, setAccessToken } = useAuthStore();
        const refreshApi = axios.create({
          baseURL: import.meta.env.VITE_API_BASE_URL,
          headers: { "Content-Type": "application/json" },
        });

        const { data } = await refreshApi.post("/auth/refresh-token", {
          token: refreshToken,
        });

        setAccessToken(data.accessToken);

        api.defaults.headers.common.Authorization = `Bearer ${data.accessToken}`;
        processQueue(null, data.accessToken);
        return api(originalRequest);
      } catch (err) {
        processQueue(err, null);
        localStorage.clear();
        window.location.href = "/";
        return Promise.reject(err);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  }
);

export default api;
