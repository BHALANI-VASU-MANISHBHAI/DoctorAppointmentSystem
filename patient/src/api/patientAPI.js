import { API_ENDPOINTS } from "../utills/constants";
import apiClient from "./axiosClient";
export const patientAPI = {
    getAllDoctors: async () => {
        const response = await apiClient.get(API_ENDPOINTS.GET_ALL_DOCTORS);
        console.log("Get All Doctors API response:", response.data);
        return response.data;
    },
    getDoctorSlots: async (doctorId) => {
        const response = await apiClient.get(API_ENDPOINTS.GET_DOCTOR_SLOTS(doctorId));
        console.log("Get Doctor Slots API response:", response.data);
        return response.data;
    },
    bookAppointment: async (data) => {
        console.log("Booking appointment with data:", data);
        const response = await apiClient.post(API_ENDPOINTS.BOOK_APPOINTMENT, data);
        console.log("Book Appointment API response:", response.data);
        return response.data;
    },
    getOwnAppointments: async () => {
        const response = await apiClient.get(API_ENDPOINTS.GET_OWN_APPOINTMENTS);
        console.log("Get Own Appointments API response:", response.data);
        return response.data;
    },
    cancelAppointment: async (appointmentId) => {
        const response = await apiClient.delete(API_ENDPOINTS.CANCEL_APPOINTMENT(appointmentId));
        console.log("Cancel Appointment API response:", response.data);
        return response.data;
    }
};