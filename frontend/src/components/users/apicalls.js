import axios from "axios";

export const getUserById = async (id) => {
  const response = await axios.get(`/api/users/${id}`);
  return response;
};

export const getUsers = async () => {
  const response = await axios.get("/api/users");
  return response;
};

export const createUser = async (data) => {
  const response = await axios.post("/api/users", data);
  return response;
};

export const updateUser = async (id, data) => {
  const response = await axios.patch(`/api/users/${id}`, data);
  return response;
};

export const removeUser = async (id) => {
  const response = await axios.delete(`/api/users/${id}`);
  return response;
};
