import axios from "axios";
import { BASE_URL } from "./Constant.js";

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  timeOut: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem("token");
    if (accessToken) {
      config.headers.Authoriztion = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;
