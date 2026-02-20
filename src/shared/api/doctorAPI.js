import { API_ENDPOINTS } from "../utils/constants"
import apiClient from "./axiosClient";


export const doctorAPI = {
    getOwnSlots: async () => {
        const response = await apiClient.get(API_ENDPOINTS.DOCTOR_GET_DOCTOR_SLOTS_DOCTOR);
        console.log("Get Own Slots API response:", response.data);
        return response;
    },
    getBookedAppointments: async () => {
        const response = await apiClient.get(API_ENDPOINTS.DOCTOR_BOOKED_APPOINTMENTS);
        console.log("Get Booked Appointments API response:", response.data);
        return response;
    },
    addSlot: async (data) => {
        const response = await apiClient.post(API_ENDPOINTS.DOCTOR_ADD_SLOT, data);
        console.log("Add Slot API response:", response.data);
        return response;
    },
    deleteSlot: async (slotId) => {
        const response = await apiClient.delete(API_ENDPOINTS.DOCTOR_DELETE_SLOT(slotId));
        console.log("Delete Slot API response:", response.data);
        return response;
    }
}