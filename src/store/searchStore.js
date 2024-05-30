import { create } from "zustand";
import api from "../api/config";

const useSearchStore = create((set) => ({
  keyword: "",
  setKeyword: (keyword) => set({ keyword }),

  loading: false,
  setLoading: (loading) => set({ loading }),

  results: [],
  setResults: (results) => set({ results }),

  getResults: async (keyword) => {
    try {
      set({ loading: true });
      const res = await api.get(`/search?q=${keyword}`);
      set({ results: res.data, loading: false });
    } catch (error) {
      set({ results: [], loading: false });
    }
  },
}));

export default useSearchStore;
