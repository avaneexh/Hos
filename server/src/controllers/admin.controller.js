import { prisma } from "../lib/db.js";   
import pkg from '@prisma/client';
const { DishStatus } = pkg;
const { FoodType } = pkg;

export const addDish = async (req, res) => {
  try {
    const {
      name,
      description,
      basePrice,
      foodType,
      category,
      sizes = [],
      addons = [],
      allergens = [], 
    } = req.body;

    const image = req.file?.path || null;

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
        basePrice: Number(basePrice),
        foodType,
        categoryId: dishCategory.id,

        allergens: Array.isArray(allergens) ? allergens : [],

        sizes: sizes.length
          ? {
              create: sizes.map((s) => ({
                name: s.name,
                price: Number(s.price),
              })),
            }
          : undefined,

        addons: addons.length
          ? {
              create: addons.map((a) => ({
                addon: {
                  connectOrCreate: {
                    where: { name: a.name },
                    create: {
                      name: a.name,
                      price: Number(a.price),
                    },
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
      error: error.message,
    });
  }
};

export const editDish = async (req, res) => {
  try {
    const { id } = req.params;

    const {
      name,
      description,
      basePrice,
      foodType,
      category,
      sizes = [],
      addons = [],
      allergens = [],
    } = req.body;

    const image = req.file?.path;

    if (!id) {
      return res.status(400).json({ message: "Dish ID required" });
    }

    let categoryId;
    if (category) {
      const dishCategory = await prisma.category.upsert({
        where: { name: category },
        update: {},
        create: { name: category },
      });
      categoryId = dishCategory.id;
    }

    const dish = await prisma.dish.update({
      where: { id },
      data: {
        name,
        description,
        basePrice: basePrice ? Number(basePrice) : undefined,
        foodType,
        image: image || undefined,
        categoryId,

        allergens: Array.isArray(allergens) ? allergens : undefined,

        sizes: {
          deleteMany: {},
          create: sizes.map((s) => ({
            name: s.name,
            price: Number(s.price),
          })),
        },

        addons: {
          deleteMany: {},
          create: addons.map((a) => ({
            addon: {
              connectOrCreate: {
                where: { name: a.name },
                create: {
                  name: a.name,
                  price: Number(a.price),
                },
              },
            },
          })),
        },
      },
      include: {
        category: true,
        sizes: true,
        addons: { include: { addon: true } },
      },
    });

    res.json({
      success: true,
      message: "Dish updated successfully",
      dish,
    });
  } catch (error) {
    console.error("Edit Dish Error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to update dish",
      error: error.message,
    });
  }
};

export const changeDishAvailability = async (req, res) => {
  try {
    const { id } = req.params;
    const { isAvailable } = req.body;

    if (!id || typeof isAvailable !== "boolean") {
      return res.status(400).json({
        success: false,
        message: "Dish ID and isAvailable (boolean) are required",
      });
    }

    const dish = await prisma.dish.update({
      where: { id },
      data: { isAvailable },
    });

    return res.json({
      success: true,
      message: `Dish marked as ${isAvailable ? "available" : "unavailable"}`,
      dish,
    });
  } catch (error) {
    console.error("Availability Error:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to update dish availability",
    });
  }
};

export const toggleDishInMenu = async (req, res) => {
  try {
    const { id } = req.params;
    const { inMenu } = req.body;

    if (!id || typeof inMenu !== "boolean") {
      return res.status(400).json({
        success: false,
        message: "Dish ID and inMenu (boolean) are required",
      });
    }

    const dish = await prisma.dish.update({
      where: { id },
      data: { inMenu },
    });

    return res.json({
      success: true,
      message: `Dish ${inMenu ? "shown in" : "hidden from"} menu`,
      dish,
    });
  } catch (error) {
    console.error("Menu Toggle Error:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to update menu visibility",
    });
  }
};

export const getAllCategories = async (req, res) => {
  try {
    const categories = await prisma.category.findMany({
      orderBy: { order: "asc" },
      include: {
        _count: {
          select: { dishes: true },
        },
      },
    });

    res.json({
      success: true,
      categories,
    });
  } catch (error) {
    console.error("Get Categories Error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch categories",
    });
  }
};

export const deleteDish = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({
        success: false,
        message: "Dish ID is required",
      });
    }

    const dish = await prisma.dish.update({
      where: { id },
      data: {
        isDeleted: true,
        inMenu: false,      
        isAvailable: false 
      },
    });

    return res.json({
      success: true,
      message: "Dish deleted successfully",
      dish,
    });
  } catch (error) {
    console.error("Delete Dish Error:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to delete dish",
    });
  }
};
