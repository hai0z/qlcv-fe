import { create } from "zustand";
import api from "../api/config";
import toast from "react-hot-toast";

const useCommentStore = create((set) => ({
  createComment: async (workId, content) => {
    try {
      await api.post("/comment", {
        content,
        workId,
      });
    } catch (error) {
      toast.error(error.response.data.message);
    }
  },
  deleteComment: async (commentId) => {
    try {
      await api.delete(`/comment/${commentId}`);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  },
}));

export default useCommentStore;
