import axios from 'axios';
import { toast } from 'react-toastify';

// Public API client without authentication headers
const publicClient = axios.create({
    baseURL: import.meta.env.VITE_BACKEND_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

publicClient.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    console.log("API Error:", error);

    if (error.response) {
      const status = error.response.status;
      const data = error.response.data;

      if (status === 401) {
        toast.error("Session expired. Please log in again.");
        localStorage.removeItem("token");
        window.location.replace("/login");
      } else if (status === 403) {
        toast.error("Unauthorized. You don't have permission.");
      } else {
        toast.error(
          data?.message || data || "An error occurred. Please try again.",
        );
      }
    } else if (error.request) {
      toast.error("Network error. Please check your internet or server.");
    } else {
      toast.error(error.message || "Unexpected error occurred.");
    }

    return Promise.reject(error);
  },
);

export default publicClient;
