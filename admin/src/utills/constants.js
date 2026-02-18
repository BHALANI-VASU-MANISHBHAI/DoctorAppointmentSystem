
export const API_ENDPOINTS = {
    //  -------------------------Auth -------------------------
    LOGIN: '/auth/login',
    SEND_VERIFICATION_CODE_EMAIL: '/auth/send-verification-otp',
    VERIFY_EMAIL: '/auth/verify-otp',
    // ------------------------Doctor------------------------
    GET_ALL_DOCTORS: '/admin/doctors',
    GET_ALL_SLOTS: '/admin/slots',
    ADD_NEW_DOCTOR: '/admin/doctors',
    ADD_DOCTOR_SLOT: (doctorId) => `/admin/doctors/${doctorId}/slots`,
    DELETE_SLOT: (slotId) => `/admin/slot/${slotId}`,
    DELETE_DOCTOR: (doctorId) => `/admin/doctors/${doctorId}`,
    GET_DOCTOR_SLOTS_BY_STATUS: (doctorId, status) => `/admin/${doctorId}/slots/${status}`,
    UPDATE_DOCTOR:`/admin/doctors`,
    GET_SPECIFIC_DOCTOR: (doctorId) => `/admin/doctors/${doctorId}`,
    // ------------------------Upload------------------------
    UPLOAD_IMAGE: '/upload/image',
    // ------------------------Password------------------------
    ForgetPassword: '/password/forget',
     RESET_PASSWORD: (token) => `/password/reset?token=${token}`,
}

export const SPECIALIZATIONS = [
    "Cardiologist",
    "Neurologist",
    "Pediatrician",
    "Dermatologist",
    "Orthopedist",
    "Psychiatrist",
    "Radiologist",
    "Oncologist",
    "General Practitioner",
    "ENT",
    "Ophthalmologist",
    "Dentist",
];

export const SLOT_STATUSES = [
    "AVAILABLE",
    "BOOKED",
];