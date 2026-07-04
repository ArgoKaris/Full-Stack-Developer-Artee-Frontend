import api from "./axios";

export const getTask = () => api.get("/task");

export const createTask = (data: any) => api.post("/task", data);

export const updateTask = (id: number, data: any) => api.put(`/task/${id}`, data);

export const deleteTask = (id: number) => api.delete(`/task/${id}`);

export const updateTasktatus = (id: number, status: string) => api.patch(`/task/${id}/status`, { status });