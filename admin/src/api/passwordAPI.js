
import { API_ENDPOINTS } from "../utills/constants.js";
import apiClient from "./axiosClient.js";
export const passwordAPI = {
    forgetPassword:async(data)=>{
        console.log("Forget Password API called with data:", data);
        const responce = await apiClient.post(API_ENDPOINTS.ForgetPassword, data);
        console.log("Forget Password API response:", responce.data);
        return responce;
    },
    resetPassword:async(data)=>{
        const responce = await apiClient.post(API_ENDPOINTS.ResetPassword, data);
        console.log("Reset Password API response:", responce.data);
        return responce;
    }
}