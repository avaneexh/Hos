import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";

export const useAdminStore = create((set, get) => ({
  isLoading: false,
  dishes: [],
  categories: [],

  addDish: async (formData) => {
    set({ isLoading: true });
    try {
      const res = await axiosInstance.post("/admin/addDish", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      toast.success("Dish added successfully");
      return res.data.dish;
    } catch (error) {
      console.error("Add Dish Error:", error);
      toast.error(error.response?.data?.message || "Failed to add dish");
      throw error;
    } finally {
      set({ isLoading: false });
    }
  },

  editDish: async (id, formData) => {
    set({ isLoading: true });
    try {
      const res = await axiosInstance.put(`/admin/dish/${id}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      toast.success("Dish updated successfully");
      return res.data.dish;
    } catch (error) {
      console.error("Edit Dish Error:", error);
      toast.error(error.response?.data?.message || "Failed to update dish");
      throw error;
    } finally {
      set({ isLoading: false });
    }
  },

  changeDishAvailability: async (id, isAvailable) => {
    try {
      await axiosInstance.patch(`/admin/dish/${id}/availability`, {
        isAvailable,
      });

      toast.success(
        `Dish marked as ${isAvailable ? "available" : "unavailable"}`
      );
    } catch (error) {
      console.error("Availability Error:", error);
      toast.error("Failed to update availability");
      throw error;
    }
  },

  toggleDishInMenu: async (id, inMenu) => {
    try {
      await axiosInstance.patch(`/admin/dish/${id}/inMenu`, {
        inMenu,
      });

      toast.success(
        `Dish ${inMenu ? "shown in menu" : "hidden from menu"}`
      );
    } catch (error) {
      console.error("Menu Toggle Error:", error);
      toast.error("Failed to update menu visibility");
      throw error;
    }
  },

  deleteDish: async (id) => {
    try {
      await axiosInstance.patch(`/admin/dish/${id}/delete`);
      toast.success("Dish deleted successfully");
    } catch (error) {
      console.error("Delete Dish Error:", error);
      toast.error("Failed to delete dish");
      throw error;
    }
  },

  getAllCategories: async () => {
    set({ isLoading: true });
    try {
      const res = await axiosInstance.get("/admin/categories");
      set({ categories: res.data.categories });
    } catch (error) {
      console.error("Get Categories Error:", error);
      toast.error("Failed to fetch categories");
    } finally {
      set({ isLoading: false });
    }
  },
}));
