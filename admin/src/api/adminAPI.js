import { API_ENDPOINTS } from "../utills/constants.js";
import apiClient from "./axiosClient.js";
export const adminAPI = {
    getAllDoctors:async()=>{
        const responce = await apiClient.get(API_ENDPOINTS.GET_ALL_DOCTORS);
        console.log("Get All Doctors API response:", responce.data);
        return responce.data;
    },
    getAllSlots:async()=>{
        const responce = await apiClient.get(API_ENDPOINTS.GET_ALL_SLOTS);
        console.log("Get All Slots API response:", responce.data);
        return responce.data;
    },
    addNewDoctor:async(data)=>{
        const responce = await apiClient.post(API_ENDPOINTS.ADD_NEW_DOCTOR, data, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
        console.log("Add New Doctor API response:", responce.data);
        return responce.data;
    },
    addDoctorSlot:async(doctorId, data)=>{
        const responce = await apiClient.post(API_ENDPOINTS.ADD_DOCTOR_SLOT(doctorId), data);
        console.log("Add Doctor Slot API response:", responce.data);
        return responce.data;
    },
    deleteSlot:async(slotId)=>{
        const responce = await apiClient.delete(API_ENDPOINTS.DELETE_SLOT(slotId));
        console.log("Delete Slot API response:", responce.data);
        return responce.data;
    },
    deleteDoctor:async(doctorId)=>{
        const responce = await apiClient.delete(API_ENDPOINTS.DELETE_DOCTOR(doctorId));
        console.log("Delete Doctor API response:", responce.data);
        return responce.data;
    },
    getDoctorSlotsByStatus:async(doctorId, status)=>{
        const responce = await apiClient.get(API_ENDPOINTS.GET_DOCTOR_SLOTS_BY_STATUS(doctorId, status));
        console.log("Get Doctor Slots By Status API response:", responce.data);
        return responce.data;
    },
    uploadImage:async(formData)=>{
        const responce = await apiClient.post(API_ENDPOINTS.UPLOAD_IMAGE, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
        console.log("Upload Image API response:", responce.data);
        return responce.data;
    },
    updateDoctor:async(data)=>{
        console.log("Updating doctor with data:", data);
        const responce = await apiClient.put(API_ENDPOINTS.UPDATE_DOCTOR,data);
        console.log("Update Doctor API response:", responce.data);
        return responce.data;
    },
    getSpecificDoctor:async(doctorId)=>{
        const responce = await apiClient.get(API_ENDPOINTS.GET_SPECIFIC_DOCTOR(doctorId));
        console.log("Get Specific Doctor API response:", responce.data);
        return responce.data;
    },
}