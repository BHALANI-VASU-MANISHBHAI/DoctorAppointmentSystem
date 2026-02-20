export const API_ENDPOINTS = {
  // ----------------------------------------Auth-----------------------------------
  LOGIN: '/auth/login',
  REGISTER: '/auth/register',
  SEND_VERIFICATION_CODE_EMAIL: '/auth/send-verification-otp',
  VERIFY_EMAIL: '/auth/verify-otp',
  FORGET_PASSWORD: '/password/forget',
  RESET_PASSWORD: (token) => `/password/reset?token=${token}`,
  
  // ----------------------------------------Admin Doctor-----------------------------------
  GET_ALL_DOCTORS: '/admin/doctors',
  GET_ALL_SLOTS: '/admin/slots',
  ADD_NEW_DOCTOR: '/admin/doctors',
  ADD_DOCTOR_SLOT: (doctorId) => `/admin/doctors/${doctorId}/slots`,
  DELETE_SLOT: (slotId) => `/admin/slot/${slotId}`,
  DELETE_DOCTOR: (doctorId) => `/admin/doctors/${doctorId}`,
  GET_DOCTOR_SLOTS_BY_STATUS: (doctorId, status) => `/admin/${doctorId}/slots/${status}`,
  UPDATE_DOCTOR: '/admin/doctors',
  GET_SPECIFIC_DOCTOR: (doctorId) => `/admin/doctors/${doctorId}`,
  
  // ----------------------------------------Patient-----------------------------------
  GET_PROFILE: '/patient/profile',
  UPDATE_PROFILE: '/patient/profile',
  GET_ALL_DOCTORS_PATIENT: '/doctor/all',
  GET_DOCTOR_SLOTS: (doctorId) => `/patient/doctors/${doctorId}/slots`,
  BOOK_APPOINTMENT: '/patient/appointments',
  PATIENT_GET_OWN_APPOINTMENTS: '/patient/appointments',  
  CANCEL_APPOINTMENT: (appointmentId) => `/patient/${appointmentId}`,
  PATIENT_GET_SPECIFIC_DOCTOR_PATIENT: (doctorId) => `/patient/doctors/${doctorId}`,
  
  // ----------------------------------------Doctor-----------------------------------
  DOCTOR_GET_DOCTOR_SLOTS_DOCTOR: '/doctor/slots',
  DOCTOR_BOOKED_APPOINTMENTS: '/doctor/appointments',
  DOCTOR_VIEW_SLOTS: '/doctor/slots',
  DOCTOR_DELETE_SLOT: (slotId) => `/doctor/slots/${slotId}`,
  DOCTOR_ADD_SLOT: '/doctor/slots',
  // ----------------------------------------Upload------------------------
  UPLOAD_IMAGE: '/upload/image',
};

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


