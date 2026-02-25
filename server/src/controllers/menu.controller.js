import Category from "../models/Category.model.js";

 
export const getMenu = async (req, res) => {
  try {
    const categories = await Category.find({})
      .sort({ order: 1 })
      .populate({
        path: "dishes",
        match: {
          inMenu: true,
          isDeleted: false,
        },
        options: { sort: { createdAt: 1 } },
        populate: [
          {
            path: "sizes",
            select: "name price",
          },
          {
            path: "addons",
            populate: {
              path: "addon",
              select: "name price",
            },
          },
        ],
      });
      console.log("categore",categories );

    const menu = categories
      .filter((cat) => cat.dishes && cat.dishes.length > 0)
      .map((cat) => ({
        category: cat.name,
        items: cat.dishes.map((dish) => ({
          id: dish._id,
          name: dish.name,
          description: dish.description,
          image: dish.image,
          price: dish.basePrice,
          isVeg: dish.foodType === "VEG",

          sizes: dish.sizes || [],
          addons: (dish.addons || []).map((a) => a.addon),
          allergens: dish.allergens || [],
        })),
      }));

      console.log("menu", menu);
      
    res.json({
      success: true,
      menu,
    });
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
    const categories = await Category.find({})
      .sort({ order: 1 })
      .populate({
        path: "dishes",
        match: {
          inMenu: true,
          isDeleted: false,
        },
        select: "_id",
      });

    const filteredCategories = categories
      .filter((c) => c.dishes && c.dishes.length > 0)
      .map((c) => ({
        id: c._id,
        name: c.name,
        count: c.dishes.length,
      }));

    res.json({
      success: true,
      categories: filteredCategories,
    });
  } catch (error) {
    console.error("Get Categories Error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch categories",
    });
  }
};