import { create } from "zustand";
import api from "../api/config";
const useUserStore = create((set) => ({
  listUsers: [],
  getListUsers: async () => {
    try {
      const res = await api.get("/user");
      set({ listUsers: res.data });
      return res.data;
    } catch (error) {
      set({ listUsers: [] });
    }
  },

  getUserByEmail: async (email) => {
    try {
      const res = await api.get(`/user/${email}`);
      return res.data;
    } catch (error) {
      throw error.response.data;
    }
  },

  createUser: async (data) => {
    try {
      await api.post("/user", {
        data,
      });
    } catch (error) {
      throw error.response.data;
    }
  },
}));

export default useUserStore;
