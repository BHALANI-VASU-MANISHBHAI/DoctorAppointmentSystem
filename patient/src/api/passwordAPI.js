import { API_ENDPOINTS } from "../utills/constants";
import apiClient from "./axiosClient";

export const passwordAPI = {
    forgetPassword:async(data)=>{
        const responce = await apiClient.post(API_ENDPOINTS.FORGET_PASSWORD, data);
        console.log("Forget Password API response:", responce.data);
        return responce;
    },
    resetPassword:async(data)=>{
        const responce = await apiClient.post(API_ENDPOINTS.RESET_PASSWORD, data);
        console.log("Reset Password API response:", responce.data);
        return responce;
    }
}