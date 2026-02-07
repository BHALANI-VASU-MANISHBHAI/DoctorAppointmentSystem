
export const API_ENDPOINTS = {
    //  -------------------------Auth -------------------------
    LOGIN: '/auth/login',
    SEND_VERIFICATION_CODE_EMAIL: '/auth/send-verification-otp',
    VERIFY_EMAIL: '/auth/verify-otp',
    // ------------------------Doctor------------------------
    GET_ALL_DOCTORS: 'doctor/all',
    GET_ALL_SLOTS: '/admin/slots',
    ADD_NEW_DOCTOR: '/admin/doctor',
    ADD_DOCTOR_SLOT: (doctorId) => `/admin/doctors/${doctorId}/slots`,
    DELETE_SLOT: (slotId) => `/admin/slot/${slotId}`,
    DELETE_DOCTOR: (doctorId) => `/admin/doctor/${doctorId}`,
    GET_DOCTOR_SLOTS_BY_STATUS: (doctorId, status) => `/admin/${doctorId}/slots/${status}`,
}