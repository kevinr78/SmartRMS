import axios from 'axios';


const api = axios.create();

api.defaults.baseURL = import.meta.env.VITE_API_BASE_URL;
api.defaults.headers.common= {
  "Content-Type": "application/json",
};

api.defaults.timeout = 10000;


api.interceptors.request.use((config) => {
  const token = localStorage.getItem("accessToken") ?? null;
  if(token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config
}, (error) => Promise.reject(error));

api.interceptors.response.use((response) => response,
  async (error) => {
    if(!error.response) console.log(error.response);

    const originalRequest = error.config;
    switch(error.response.status) {
      case 401:
        if(!originalRequest._retry) {
          originalRequest._retry = true;
          try {
            const refreshToken = localStorage.getItem('refreshToken');
            const { data } = await api.post(`${import.meta.env.BASE_URL}/api/auth/refresh`, {
              token: refreshToken
            });
            localStorage.setItem("accessToken", data.accessToken);
            api.defaults.headers.common.Authorization = `Bearer ${data.accessToken}`;
            originalRequest.headers.Authorization =`Bearer ${data.accessToken}`;
            return api(originalRequest)
          } catch (error) {
            console.log("Session xpired. PLease Login Again")
            localStorage.clear();
            window.location.href = "/login"
          }
        }
        break;
      case 403:
        console.log("Forbidden");
        break;
      case 500:
        console.log('Server Error');
        break;
      default:
        console.error("API Error:", error.response?.data || error.message);
    }
    return Promise.reject(error)
  })
export default api