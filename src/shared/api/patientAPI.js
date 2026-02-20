import { API_ENDPOINTS } from "../utils/constants";
import apiClient from "./axiosClient";
export const patientAPI = {
    getProfile: async () => {
        const response = await apiClient.get(API_ENDPOINTS.GET_PROFILE);
        console.log("Get Profile API response:", response.data);
        return response;
    },
    updateProfile: async (data) => {
        const response = await apiClient.put(
            API_ENDPOINTS.UPDATE_PROFILE,
            data,
            { headers: {'Content-Type': 'multipart/form-data' } }
        );
        console.log("Update Profile API response:", response.data);
        return response;
    },
    getAllDoctors: async () => {
        const response = await apiClient.get(API_ENDPOINTS.GET_ALL_DOCTORS_PATIENT);
        console.log("Get All Doctors API response:", response.data);
        return response;
    },
    getDoctorSlots: async (doctorId) => {
        const response = await apiClient.get(API_ENDPOINTS.GET_DOCTOR_SLOTS(doctorId));
        console.log("Get Doctor Slots API response:", response.data);
        return response;
    },
    bookAppointment: async (data) => {
        console.log("Booking appointment with data:", data);
        const response = await apiClient.post(API_ENDPOINTS.BOOK_APPOINTMENT, data);
        console.log("Book Appointment API response:", response.data);
        return response;
    },
    getOwnAppointments: async () => {
        const response = await apiClient.get(API_ENDPOINTS.PATIENT_GET_OWN_APPOINTMENTS);
        console.log("Get Own Appointments API response:", response.data);
        return response;
    },
    cancelAppointment: async (appointmentId) => {
        const response = await apiClient.delete(API_ENDPOINTS.CANCEL_APPOINTMENT(appointmentId));
        console.log("Cancel Appointment API response:", response.data);
        return response;
    },
    getSpecificDoctor: async (doctorId) => {
        const response = await apiClient.get(API_ENDPOINTS.PATIENT_GET_SPECIFIC_DOCTOR_PATIENT(doctorId));
        console.log("Get Specific Doctor API response:", response.data);
        return response;
    },
};