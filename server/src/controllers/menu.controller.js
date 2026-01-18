import { prisma } from "../lib/db.js";


export const getMenu = async (req, res) => {
  try {
    const categories = await prisma.category.findMany({
      orderBy: { order: "asc" },
      include: {
        dishes: {
          where: {
            inMenu: true,
            isDeleted: false,
          },
          orderBy: { createdAt: "asc" },
          include: {
            sizes: {
              select: {
                id: true,
                name: true,
                price: true,
              },
            },
            addons: {
              include: {
                addon: {
                  select: {
                    id: true,
                    name: true,
                    price: true,
                  },
                },
              },
            },
          },
        },
      },
    });

    const menu = categories
      .filter((cat) => cat.dishes.length > 0)
      .map((cat) => ({
        category: cat.name,
        items: cat.dishes.map((dish) => ({
          id: dish.id,
          name: dish.name,
          description: dish.description,
          image: dish.image,
          price: dish.basePrice,
          isVeg: dish.foodType === "VEG",

          sizes: dish.sizes,
          addons: dish.addons.map((a) => a.addon),
          allergens: dish.allergens,
        })),
      }));

    res.json({ success: true, menu });
  } catch (error) {
    console.error("Get Menu Error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch menu",
    });
  }
};

export const getMenuCategories = async (req, res) => {
  try {
    const categories = await prisma.category.findMany({
      orderBy: { order: "asc" },
      where: {
        dishes: {
          some: {
            status: "AVAILABLE",
            inMenu: true,
            isDeleted: false,
          },
        },
      },
      select: {
        id: true,
        name: true,
        _count: {
          select: {
            dishes: {
              where: {
                status: "AVAILABLE",
                inMenu: true,
                isDeleted: false,
              },
            },
          },
        },
      },
    });

    res.json({
      success: true,
      categories: categories.map((c) => ({
        id: c.id,
        name: c.name,
        count: c._count.dishes,
      })),
    });
  } catch (error) {
    console.error("Get Categories Error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch categories",
    });
  }
};
