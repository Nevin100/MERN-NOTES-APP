import axios from "axios";
import { BASE_URL } from "./Constant.js";

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  timeout: 10000, // Note: 'timeout' should be all lowercase
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem("token");
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`; // Fixed typo here
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;
