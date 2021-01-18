import axios from "axios";

export const getTasks = async () => {
  const response = await axios.get("/api/tasks");
  return response;
};

export const createTask = async (data) => {
  const response = await axios.post("/api/tasks", data);
  return response;
};

export const updateTask = async (id, data) => {
  const response = await axios.patch(`/api/tasks/${id}`, data);
  return response;
};

export const removeTask = async (id) => {
  const response = await axios.delete(`/api/tasks/${id}`);
  return response;
};
