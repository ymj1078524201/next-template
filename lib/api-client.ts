import axios, { AxiosError } from "axios";
import { env } from "./env";

// 创建 Axios 实例
export const apiClient = axios.create({
  baseURL: env.NEXT_PUBLIC_API_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

// 请求拦截器
apiClient.interceptors.request.use(
  (config) => {
    // 可以在这里注入 Token
    // const token = localStorage.getItem("token");
    // if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  (error) => Promise.reject(error)
);

// 响应拦截器
apiClient.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    // 统一处理 HTTP 错误 (如 401, 403, 500)
    if (error.response) {
      switch (error.response.status) {
        case 401:
          console.error("未授权，请重新登录");
          break;
        case 403:
          console.error("拒绝访问");
          break;
        case 500:
          console.error("服务器错误");
          break;
      }
    }
    return Promise.reject(error);
  }
);
