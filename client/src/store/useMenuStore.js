import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";

export const useMenuStore = create((set) => ({
  isLoading: false,
  menu: [],
  categories: [],

  getMenu: async () => {
    set({ isLoading: true });
    try {
      const res = await axiosInstance.get("/menu");
      set({ menu: res.data.menu });
    } catch (error) {
      console.error("Get Menu Error:", error);
      toast.error("Failed to load menu");
    } finally {
      set({ isLoading: false });
    }
  },

  getMenuCategories: async () => {
    try {
      const res = await axiosInstance.get("/menu/categories");
      set({ categories: res.data.categories });
    } catch (error) {
      console.error("Get Menu Categories Error:", error);
    }
  },
}));
