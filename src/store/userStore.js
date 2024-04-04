import { create } from "zustand";
import api from "../api/config";
const useUserStore = create((set) => ({
  user: null,
  setUser: (user) => set({ user }),
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
      set({ user: res.data });
    } catch (error) {
      set({ user: null });
    }
  },

  createUser: async (data) => {
    try {
      await api.post("/user", {
        data,
      });
    } catch (error) {
      set({ user: null });
    }
  },
}));

export default useUserStore;
