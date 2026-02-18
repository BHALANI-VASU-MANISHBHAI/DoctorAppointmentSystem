
export const API_ENDPOINTS = {
    //  -------------------------Auth -------------------------
    LOGIN: '/auth/login',
    SEND_VERIFICATION_CODE_EMAIL: '/auth/send-verification-otp',
    VERIFY_EMAIL: '/auth/verify-otp',
    // ------------------------Doctor------------------------
    GET_OWN_SLOTS: '/doctor/slots',
    GET_BOOKED_APPOINTMENTS: '/doctor/appointments',
    ADD_SLOT: `/doctor/slots`,
    DELETE_SLOT: (slotId) => `/doctor/slots/${slotId}`,

    // ------------------------password --------------------------
     FORGET_PASSWORD: '/password/forget',
    RESET_PASSWORD: (token) => `/password/reset?token=${token}`,
}