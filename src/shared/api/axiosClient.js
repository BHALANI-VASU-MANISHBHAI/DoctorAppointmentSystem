// apiClient.js
import axios from "axios";
import { toast } from "react-toastify";

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// ================= REQUEST INTERCEPTOR =================
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    // Handle form data automatically
    if (config.data instanceof FormData) {
      config.headers["Content-Type"] = "multipart/form-data";
    }

    return config;
  },
  (error) => Promise.reject(error)
);

// ================= RESPONSE INTERCEPTOR =================
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    console.log("API Error:", error);

    let message = "Something went wrong. Please try again.";

    if (error.response) {
      const { status, data } = error.response;

      if (status === 401) {
        message = "Session expired. Please login again.";
      } else if (status === 403) {
        message = "Unauthorized action.";
      } else if (typeof data === "string") {
        message = data;
      } else if (data?.message) {
        message = data.message;
      }
    } else if (error.request) {
      message = "Server not responding. Check your internet.";
    }

    toast.error(message);

    return Promise.reject(error);
  }
);

export default apiClient;