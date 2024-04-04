import { create } from "zustand";
import api from "../api/config";
import { getEventColor } from "../utils/work";
import toast from "react-hot-toast";
const useWorkStore = create((set) => ({
  listWorks: {
    data: [],
    totalPage: 0,
  },
  todayWorks: [],
  events: [],
  progressChart: [],
  work: null,
  loading: true,
  setWork: (work) => set({ work }),
  getWorkById: async (id) => {
    try {
      const res = await api.get(`/work/${id}`);
      set({ work: res.data });
    } catch (error) {
      set({ work: null });
    }
  },
  getListWorks: async (page = 1, limit = 5) => {
    set({ loading: true });
    try {
      const res = (await api.get(`/work?page=${page}&limit=${limit}`)).data;
      set({
        listWorks: {
          data: res.data,
          totalPage: res.totalPage,
        },
      });
      set({ loading: false });
    } catch (error) {
      set({ works: { data: [], totalPage: 0 } });
      set({ loading: false });
    }
  },
  getTodayWorks: async () => {
    try {
      const res = await api.get("/work/today");
      set({ todayWorks: res.data });
    } catch (error) {
      set({ todayWorks: [] });
    }
  },
  getEvents: async () => {
    try {
      const res = await api.get("/work/calendar");
      set({
        events: res.data.map((w) => {
          return {
            title: w.title,
            start: w.startTime,
            end: w.endTime,
            color: getEventColor(w.status),
            url: `/work-info/${w.id}`,
          };
        }),
      });
    } catch (error) {
      set({ events: [] });
    }
  },
  getProgressChart: async () => {
    try {
      const res = await api.get("/work/chart");
      set({
        progressChart: res.data,
      });
    } catch (error) {
      set({ progressChart: [] });
    }
  },
  updateWorkStatus: async (workId, status) => {
    try {
      await api.put(`/work/update-status/${workId}`, {
        status,
      });
    } catch (error) {
      toast.error(error.response.data.message);
    }
  },
  createWorkRequest: async (title, workImplementerId, userId, workId) => {
    try {
      await api.post("/work/create-work-request/" + workId, {
        title,
        workImplementerId,
        userId,
      });
    } catch (error) {
      throw error;
    }
  },
  updateWorkRequest: async (workRequestId, data, workId) => {
    try {
      await api.put("/work/update-work-request/" + workId, {
        data: {
          ...data,
        },
        workRequestId,
      });
    } catch (error) {
      throw error;
    }
  },
  deleteWorkRequest: async (workRequestId) => {
    try {
      await api.delete("/work/delete-work-request/" + workRequestId);
    } catch (error) {
      throw error;
    }
  },
  createWork: async (data) => {
    try {
      const workId = (
        await api.post("/work", {
          data,
        })
      ).data;
      return workId;
    } catch (error) {
      throw error;
    }
  },
  deleteWork: async (workId) => {
    try {
      await api.delete("/work/" + workId);
    } catch (error) {
      throw error;
    }
  },
  addMemberToWork: async (workId, userId) => {
    try {
      await api.post("/work/add-member/" + workId, {
        userId,
      });
    } catch (error) {
      throw error;
    }
  },
}));

export default useWorkStore;
