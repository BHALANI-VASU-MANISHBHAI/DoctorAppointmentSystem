import { API_ENDPOINTS } from "../utills/constants"
import apiClient from "./axiosClient";


export const docotorAPI = {
    getOwnSlots: async () => {
        const response = await apiClient.get(API_ENDPOINTS.GET_OWN_SLOTS);
        console.log("Get Own Slots API response:", response.data);
        return response;
    },
    getBookedAppointments: async () => {
        const response = await apiClient.get(API_ENDPOINTS.GET_BOOKED_APPOINTMENTS);
        console.log("Get Booked Appointments API response:", response.data);
        return response;
    }
}