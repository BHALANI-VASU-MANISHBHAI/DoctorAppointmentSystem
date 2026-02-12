export const API_ENDPOINTS = {
// ----------------------------------------Auth-----------------------------------
    LOGIN: '/auth/login',
    REGISTER: '/auth/register',
    SEND_VERIFICATION_CODE_EMAIL: '/auth/send-verification-otp',
    VERIFY_EMAIL: '/auth/verify-otp',
// ----------------------------------------Patient-----------------------------------
    GET_ALL_DOCTORS: 'doctor/all',
    GET_DOCTOR_SLOTS: (doctorId) => `/patient/doctors/${doctorId}/slots`,
    BOOK_APPOINTMENT: '/patient/bookappointment',
    GET_OWN_APPOINTMENTS: '/patient/appointments',  
    CANCEL_APPOINTMENT: (appointmentId) => `/patient/${appointmentId}`,
// ----------------------------------------Doctor-----------------------------------
    GET_OWN_SLOTS: '/doctor/slots',
    GET_BOOKED_APPOINTMENTS: '/doctor/appointments',
// ----------------------------------------Admin-----------------------------------
    GET_ALL_DOCTORS_ADMIN: '/admin/doctors',
    GET_ALL_SLOTS: '/admin/slots',
    ADD_NEW_DOCTOR: '/admin/doctor',
    ADD_DOCTOR_SLOT: (doctorId) => `/admin/doctors/${doctorId}/slots`,
    DELETE_SLOT: (slotId) => `/admin/slot/${slotId}`,
    DELETE_DOCTOR: (doctorId) => `/admin/doctor/${doctorId}`,
    GET_DOCTOR_SLOTS_BY_STATUS: (doctorId, status) => `/admin/${doctorId}/slots/${status}`,
// ----------------------------------------Password Reset-----------------------------------
    FORGET_PASSWORD: '/password/forget',
    RESET_PASSWORD: '/password/reset'
};


    
// egistration user
// POST http://localhost:8080/auth/register
// login user
// POST {{BACKEND_URL}}/auth/login
// send veriification email
// POST {{BACKEND_URL}}/auth/send-verification-otp
// verify email
// POST {{BACKEND_URL}}/auth/verify-otp
// patient 5) get all doctors to patient

// GET {{BACKEND_URL}}/patient/doctors
// speciifc doctor avlalible  slot
// GET {{BACKEND_URL}}/patient/doctors/{{doctorId}}/slots
// book appointment
// POST {{BACKEND_URL}}/patient/bookappointment
// get all appointment of own
// GET {{BACKEND_URL}}/patient/appointments
// cancel appointment
// DELETE {{BACKEND_URL}}/patient/{{appintmentId}}
// doctors 10) own slot

// GET {{BACKEND_URL}}/doctor/slots
// see  all booked appintment
// GET {{BACKEND_URL}}/doctor/appointments
// admin 12) Admin get Doctor

// GET http://localhost:8080/admin/doctors
// Admin Get All slots
// GET http://localhost:8080/admin/slots
// add new Doctor
// POST {{BACKEND_URL}}/admin/doctor
// add doctor slot
// POST {{BACKEND_URL}}/admin/doctors/{{doctorId}}/slots
// delete appointment slot
// DELETE {{BACKEND_URL}}/admin/slot/3
// delete doctor
// DELETE {{BACKEND_URL}}/admin/doctor/2
// any specific doctor and Status
// GET {{BACKEND_URL}}/admin/3/slots/DEACTIVATED
// passwordreset 19) forget password

// POST {{BACKEND_URL}}/password/forget
// Reset Password
// POST {{BACKEND_URL}}/password/reset