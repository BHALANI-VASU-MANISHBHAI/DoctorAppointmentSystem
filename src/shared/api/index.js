import { authAPI } from "./authAPI.js";
import { patientAPI } from "./patientAPI.js";
import { passwordAPI } from "./passwordAPI.js";
import { adminAPI } from "./adminAPI.js";
import { doctorAPI } from "./doctorAPI.js";


export default {
    auth: authAPI,
    patient: patientAPI,
    password: passwordAPI,
    admin: adminAPI,
    doctor: doctorAPI
}