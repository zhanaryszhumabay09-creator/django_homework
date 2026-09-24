// AI-GENERATED: Qoder
import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://127.0.0.1:8000/api",
});

const ACCESS_KEY = "zhorastore_access";
const REFRESH_KEY = "zhorastore_refresh";

export const tokenStorage = {
  get access() {
    return localStorage.getItem(ACCESS_KEY);
  },
  get refresh() {
    return localStorage.getItem(REFRESH_KEY);
  },
  set(access: string, refresh: string) {
    localStorage.setItem(ACCESS_KEY, access);
    localStorage.setItem(REFRESH_KEY, refresh);
  },
  clear() {
    localStorage.removeItem(ACCESS_KEY);
    localStorage.removeItem(REFRESH_KEY);
  },
};

api.interceptors.request.use((config) => {
  const token = tokenStorage.access;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Один раз пытаемся обновить access-токен при 401.
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const original = error.config;
    const refresh = tokenStorage.refresh;

    if (error.response?.status === 401 && refresh && !original._retry) {
      original._retry = true;
      try {
        const { data } = await axios.post(
          `${api.defaults.baseURL}/auth/refresh/`,
          { refresh }
        );
        tokenStorage.set(data.access, refresh);
        original.headers.Authorization = `Bearer ${data.access}`;
        return api(original);
      } catch {
        tokenStorage.clear();
      }
    }
    return Promise.reject(error);
  }
);

export default api;
