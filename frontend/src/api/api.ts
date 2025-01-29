import axios from "axios";
import { RegisterForm } from "../type/auth";

const api = axios.create({
  baseURL: "http://localhost:8080",
});

const links = {
  registerUser: (registerForm: RegisterForm) => api.post("/auth/register", registerForm),

  readActivities: (UserEmail: string) => api.get(`/activities/list/${UserEmail}`),
};

export { links };
export default api;
