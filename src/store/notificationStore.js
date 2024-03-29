import { create } from "zustand";
import api from "../api/config";
import toast from "react-hot-toast";

const useNotificationStore = create((set) => ({
  notifications: [],
  getNotification: async () => {
    try {
      const res = await api.get("/notification");
      set({ notifications: res.data });
    } catch (error) {
      set({ notifications: [] });
    }
  },
  updateNotification: async (id) => {
    try {
      await api.put(`/notification/${id}`);
    } catch (error) {
      throw new Error(error);
    }
  },
}));

export default useNotificationStore;
