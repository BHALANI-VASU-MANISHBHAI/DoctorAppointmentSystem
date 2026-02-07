import { API_ENDPOINTS } from "../utills/constants.js";
import apiClient from "./axiosClient.js";
export const authAPI = {
    login:async(data)=>{
        const responce = await apiClient.post(API_ENDPOINTS.LOGIN, data);
        console.log("Login API response:", responce.data);
        return responce;
    }
}