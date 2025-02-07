import axios from "axios";
import { RegisterForm } from "../type/auth";
import { ChangeStatusDTO } from "../type/Activities/changeStatusDTO";
import { create } from "domain";
import { CreateActivitiesDTO } from "../type/Activities/CreateActivitiesDTO";
import { UpdateActivitiesDTO } from "../type/Activities/UpdateActivitiesDTO";

const api = axios.create({
  baseURL: "http://localhost:8080",
});

const links = {
  registerUser: (registerForm: RegisterForm) => api.post("/auth/register", registerForm),

  readActivities: (UserEmail: string) => api.get(`/activities/list/${UserEmail}`),

  readActivitiesById: (id: string) => api.get(`/activities/read/${id}`),

  changeStatus: (changeStatus: ChangeStatusDTO) => api.put(`/activities/changeStatus`, changeStatus),

  deleteTask: (id: string) => api.delete(`/activities/delete/${id}`),

  createActivities: (newTask: CreateActivitiesDTO) => api.post(`/activities/create`, newTask),

  updateActivities: (updateTask: UpdateActivitiesDTO) => api.put(`/activities/update`, updateTask),
};

export { links };
export default api;
