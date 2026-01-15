import { prisma } from "../lib/db.js";   
import pkg from '@prisma/client';
const { DishStatus } = pkg;
const { FoodType } = pkg;

export const addDish = async (req, res) => {
  try {
    const {
      name,
      description,
      image,
      basePrice,
      foodType,
      category,
      sizes = [],
      addons = [],
      allergens = [],
    } = req.body;

    if (!name || !category || !foodType || !basePrice) {
      return res.status(400).json({
        success: false,
        message: "Required fields missing",
      });
    }

    const dishCategory = await prisma.category.upsert({
      where: { name: category },
      update: {},
      create: { name: category },
    });

    const dish = await prisma.dish.create({
      data: {
        name,
        description,
        image,
        basePrice,
        foodType,
        categoryId: dishCategory.id,

        sizes: sizes.length
          ? {
              create: sizes.map((s) => ({
                name: s.name,
                price: s.price,
              })),
            }
          : undefined,

        addons: addons.length
          ? {
              create: addons.map((a) => ({
                addon: {
                  create: {
                    name: a.name,
                    price: a.price,
                  },
                },
              })),
            }
          : undefined,

        allergens: allergens.length
          ? {
              create: allergens.map((a) => ({
                allergen: {
                  connectOrCreate: {
                    where: { name: a.name },
                    create: { name: a.name },
                  },
                },
              })),
            }
          : undefined,
      },
      include: {
        category: true,
        sizes: true,
        addons: {
          include: { addon: true },
        },
        allergens: {
          include: { allergen: true },
        },
      },
    });

    return res.status(201).json({
      success: true,
      message: "Dish added successfully",
      dish,
    });
  } catch (error) {
    console.error("Add Dish Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to add dish",
    });
  }
};
