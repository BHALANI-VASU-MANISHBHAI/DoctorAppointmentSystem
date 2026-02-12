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

        console.log('API Error:', error.response);
      if(error.response){
        if(error.response.status === 401){
            toast.error("Session expired. Please log in again.");
            localStorage.removeItem('token');
            window.location.replace('/login');
        }else if(error.response.status==403){
            toast.error("unauthorized. You don't have permission to perform this action.");
        }else if(error.response.data){
            toast.error(error.response.data || "An error occurred. Please try again.");
        }else{
            toast.error("An error occurred. Please try again.");
        }

      }
        
        return Promise.reject(error);
    }
);





export default apiClient;

