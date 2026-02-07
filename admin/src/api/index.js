import { authAPI } from "./authAPI.js";
import { passwordAPI } from "./passwordAPI.js";
import { adminAPI } from "./adminAPI.js";

const API = {
  auth: authAPI,
  password: passwordAPI,
  admin: adminAPI,
};

export default API;