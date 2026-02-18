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
    },
    addSlot: async (data) => {
        const response = await apiClient.post(API_ENDPOINTS.ADD_SLOT, data);
        console.log("Add Slot API response:", response.data);
        return response;
    },
    deleteSlot: async (slotId) => {
        const response = await apiClient.delete(API_ENDPOINTS.DELETE_SLOT(slotId));
        console.log("Delete Slot API response:", response.data);
        return response;
    }
}