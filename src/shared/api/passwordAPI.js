import { API_ENDPOINTS } from "../utils/constants";
import apiClient from "./axiosClient";

export const passwordAPI = {
    forgetPassword:async(data)=>{
        const responce = await apiClient.post(API_ENDPOINTS.FORGET_PASSWORD, data);
        console.log("Forget Password API response:", responce.data);
        return responce;
    },
    resetPassword:async(token,data)=>{
        console.log("Reset Password API called with token:", token, "and data:", data);
        const responce = await apiClient.post(API_ENDPOINTS.RESET_PASSWORD(token), 
        data
        );
        console.log("Reset Password API response:", responce.data);
        return responce;
    }
}
