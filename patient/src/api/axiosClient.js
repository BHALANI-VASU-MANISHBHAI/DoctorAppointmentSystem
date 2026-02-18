import axios from 'axios';
import { toast } from 'react-toastify';

const apiClient = axios.create({
    baseURL: import.meta.env.VITE_BACKEND_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});


apiClient.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }

        if(config.data instanceof FormData){
            config.headers['Content-Type'] = 'multipart/form-data';
        }

        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

apiClient.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    console.log("API Error:", error);

    if (error.response) {
      // Server responded with status code
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
      // Request sent but no response
      toast.error("Network error. Please check your internet or server.");
    } else {
      // Something else
      toast.error(error.message || "Unexpected error occurred.");
    }

    return Promise.reject(error);
  },
);



export default apiClient;

