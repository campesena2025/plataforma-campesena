import axios, { AxiosResponse, AxiosError } from "axios";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  timeout: 10000, // 10 segundos de timeout
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(
  (config) => {
    const useAuth = (config as any).useAuth;

    if (useAuth) {
      const token =
        typeof window !== "undefined" ? localStorage.getItem("token") : null;

      if (token) {
        config.headers = config.headers || {};
        config.headers["Authorization"] = `Bearer ${token}`;
      }
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

api.interceptors.response.use(
  (response: AxiosResponse) => {
    return response;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  },
);

export function withAuth(config?: any, useAuth = true) {
  return { ...(config || {}), useAuth };
}

export default api;
