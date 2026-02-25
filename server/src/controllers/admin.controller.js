import Category from "../models/Category.model.js";
import Dish from "../models/Dish.model.js";
import DishSize from "../models/DishSize.model.js";
import Addon from "../models/Addon.model.js";
import DishAddon from "../models/DishAddon.model.js";


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

    let dishCategory = await Category.findOne({ name: category });
    if (!dishCategory) {
      dishCategory = await Category.create({ name: category });
    }

    const dish = await Dish.create({
      name,
      description,
      image,
      basePrice: Number(basePrice),
      foodType,
      category: dishCategory._id,
      allergens: Array.isArray(allergens) ? allergens : [],
    });

    await Category.findByIdAndUpdate(
      dishCategory._id,
      { $push: { dishes: dish._id } }
    );

    let sizeIds = [];
    if (sizes.length) {
      const createdSizes = await DishSize.insertMany(
        sizes.map((s) => ({
          name: s.name,
          price: Number(s.price),
          dish: dish._id,
        }))
      );
      sizeIds = createdSizes.map((s) => s._id);
    }

    let addonBridgeIds = [];
    for (const a of addons) {
      let addonDoc = await Addon.findOne({ name: a.name });

      if (!addonDoc) {
        addonDoc = await Addon.create({
          name: a.name,
          price: Number(a.price),
        });
      }

      const bridge = await DishAddon.create({
        dish: dish._id,
        addon: addonDoc._id,
      });

      addonBridgeIds.push(bridge._id);
    }

    dish.sizes = sizeIds;
    dish.addons = addonBridgeIds;
    await dish.save();

    const populatedDish = await Dish.findById(dish._id)
      .populate("category")
      .populate("sizes")
      .populate({
        path: "addons",
        populate: { path: "addon" },
      });

    return res.status(201).json({
      success: true,
      message: "Dish added successfully",
      dish: populatedDish,
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
      let cat = await Category.findOne({ name: category });
      if (!cat) {
        cat = await Category.create({ name: category });
      }
      categoryId = cat._id;
    }

    const dish = await Dish.findByIdAndUpdate(
      id,
      {
        name,
        description,
        basePrice: basePrice ? Number(basePrice) : undefined,
        foodType,
        image: image || undefined,
        category: categoryId,
        allergens: Array.isArray(allergens) ? allergens : undefined,
      },
      { new: true }
    );

    await DishSize.deleteMany({ dish: id });
    await DishAddon.deleteMany({ dish: id });

    const newSizes = await DishSize.insertMany(
      sizes.map((s) => ({
        name: s.name,
        price: Number(s.price),
        dish: id,
      }))
    );

    const newAddonBridges = [];
    for (const a of addons) {
      let addonDoc = await Addon.findOne({ name: a.name });
      if (!addonDoc) {
        addonDoc = await Addon.create({
          name: a.name,
          price: Number(a.price),
        });
      }

      const bridge = await DishAddon.create({
        dish: id,
        addon: addonDoc._id,
      });

      newAddonBridges.push(bridge._id);
    }

    dish.sizes = newSizes.map((s) => s._id);
    dish.addons = newAddonBridges;
    await dish.save();

    const populatedDish = await Dish.findById(id)
      .populate("category")
      .populate("sizes")
      .populate({
        path: "addons",
        populate: { path: "addon" },
      });

    res.json({
      success: true,
      message: "Dish updated successfully",
      dish: populatedDish,
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

    const dish = await Dish.findByIdAndUpdate(
      id,
      { isAvailable },
      { new: true }
    );

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

    const dish = await Dish.findByIdAndUpdate(
      id,
      { inMenu },
      { new: true }
    );

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
    const categories = await Category.aggregate([
      {
        $lookup: {
          from: "dishes",
          localField: "_id",
          foreignField: "category",
          as: "dishes",
        },
      },
      {
        $addFields: {
          dishCount: { $size: "$dishes" },
        },
      },
      { $sort: { order: 1 } },
    ]);

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

    const dish = await Dish.findByIdAndUpdate(
      id,
      {
        isDeleted: true,
        inMenu: false,
        isAvailable: false,
      },
      { new: true }
    );

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