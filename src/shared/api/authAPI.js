import apiClient from "./axiosClient";
import { API_ENDPOINTS } from "../utils/constants";

export const authAPI = {
  register: async (data) => {
    const responce = await apiClient.post(API_ENDPOINTS.REGISTER, data);
    return responce;
  },
  login: async (data) => {
    const responce = await apiClient.post(API_ENDPOINTS.LOGIN, data);
    console.log("Login API response:", responce.data);
    return { token: responce.data };
  },
  sendVerificationCodeEmail: async (data) => {
    const responce = await apiClient.post(
      API_ENDPOINTS.SEND_VERIFICATION_CODE_EMAIL,
      data,
    );
    return responce;
  },
  verifyEmail: async (data) => {
    const responce = await apiClient.post(API_ENDPOINTS.VERIFY_EMAIL, data);
    return responce;
  },
};
