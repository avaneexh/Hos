import { z } from "zod";

export const addItemSchema = z.object({
  name: z.string().min(2, "Item name is required"),
  category: z.string().min(1, "Category is required"),
  newCategory: z.string().optional(),

  price: z.number().positive("Price must be greater than 0"),

  description: z.string().optional(),

  image: z
    .any()
    .refine((file) => file?.length === 1, "Image is required"),

  isVeg: z.boolean(),
  available: z.boolean(),

  sizes: z
    .array(
      z.object({
        name: z.string().min(1),
        price: z.number().positive(),
      })
    )
    .optional(),

  addons: z
    .array(
      z.object({
        name: z.string().min(1),
        price: z.number().positive(),
      })
    )
    .optional(),

  allergens: z
    .array(
      z.object({
        name: z.string().min(1),
      })
    )
    .optional(),
});
