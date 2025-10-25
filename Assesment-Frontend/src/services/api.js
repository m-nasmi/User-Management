import axios from "axios";

const API_BASE_URL = "http://localhost:3001/api";

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const userAPI = {
  getAllUsers: async () => {
    const response = await api.get("/users");
    return response.data;
  },

  createUser: async (userData) => {
    const response = await api.post("/users", userData);
    return response.data;
  },

  updateUser: async (id, userData) => {
    const response = await api.put(`/users/${id}`, userData);
    return response.data;
  },

  deleteUser: async (id) => {
    const response = await api.delete(`/users/${id}`);
    return response.data;
  },

  updateUserFavorites: async (id, favorite) => {
    const response = await api.patch(`/users/${id}/favorites`, { favorite });
    return response.data;
  },
};

export default api;