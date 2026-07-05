import api from "./api";

export const getTasks = () => api.get("/tasks");

export const createTask = (data: {
  title: string;
  description: string;
  dueDate?: string;
}) => api.post("/tasks", data);

export const deleteTask = (id: number) =>
  api.delete(`/tasks/${id}`);

export const toggleTaskStatus = (
  id: number,
  status: string
) =>
  api.patch(`/tasks/${id}/status`, {
    status,
  });

export const updateTask = (
  id: number,
  data: {
    title: string;
    description: string;
    dueDate?: string;
  }
) => api.put(`/tasks/${id}`, data);