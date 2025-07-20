import axios from "axios";
import toast from "react-hot-toast";
import { ACCESS_TOKEN } from "../constants/api";

const api = axios.create({ baseURL: import.meta.env.VITE_API_URL });

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem(ACCESS_TOKEN);

    // Add Authorization header if token exists
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    if (
      config.method?.toLowerCase() !== "get" &&
      !config.suppressToast &&
      !config.suppressSuccessToast
    ) {
      config.toastId = toast.loading("Processing request...");
    }

    return config;
  },
  (error) => Promise.reject(error),
);

api.interceptors.response.use(
  (response) => {
    if (response.config.toastId) {
      if (!response.config.suppressSuccessToast) {
        const message =
          response.config.successMessage ||
          response.data?.message ||
          "Operation successful!";

        toast.success(message, {
          id: response.config.toastId,
        });
      } else {
        toast.dismiss(response.config.toastId);
      }
    }
    return response;
  },
  (error) => {
    const message =
      error.response?.data?.message ||
      error.response?.data?.detail ||
      error.message ||
      "Something went wrong!";

    if (error.config.toastId) {
      toast.error(message, { id: error.config.toastId });
    } else if (!error.config.suppressToast) {
      toast.error(message);
    }

    return Promise.reject(error);
  },
);

export default api;
