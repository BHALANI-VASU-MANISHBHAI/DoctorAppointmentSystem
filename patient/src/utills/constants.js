export const API_ENDPOINTS = {
// ----------------------------------------Auth-----------------------------------
    LOGIN: '/auth/login',
    REGISTER: '/auth/register',
    SEND_VERIFICATION_CODE_EMAIL: '/auth/send-verification-otp',
    VERIFY_EMAIL: '/auth/verify-otp',
// ----------------------------------------Patient-----------------------------------
    GET_PROFILE: '/patient/profile',
    UPDATE_PROFILE: '/patient/updateProfile',
    GET_ALL_DOCTORS: 'doctor/all?page=0&size=10&sort=experience,desc',
    GET_DOCTOR_SLOTS: (doctorId) => `/patient/doctors/${doctorId}/slots`,
    BOOK_APPOINTMENT: '/patient/appointments',
    GET_OWN_APPOINTMENTS: '/patient/appointments',  
    CANCEL_APPOINTMENT: (appointmentId) => `/patient/${appointmentId}`,
    GET_PROFILE: '/patient/profile',
    UPDATE_PROFILE: '/patient/profile', 
    GET_SPECIFIC_DOCTOR: (doctorId) => `/patient/doctors/${doctorId}`,
// ----------------------------------------Doctor-----------------------------------
// ----------------------------------------Password Reset-----------------------------------
    FORGET_PASSWORD: '/password/forget',
    RESET_PASSWORD: '/password/reset'
};

