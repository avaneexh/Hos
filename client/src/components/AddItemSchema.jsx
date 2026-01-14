import { z } from "zod";

export const  addItemSchema = z.object({
  name: z.string().min(2, "Item name is required"),
  category: z.string().min(1, "Category is required"),
  newCategory: z.string().optional(),
  price: z.number({ invalid_type_error: "Price is required" }).positive(),
  description: z.string().optional(),
  isVeg: z.boolean(),
  available: z.boolean(),
  image: z
    .any()
    .refine((file) => file?.length === 1, "Image is required"),
});