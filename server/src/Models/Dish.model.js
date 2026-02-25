import mongoose from "mongoose";

const dishSchema = new mongoose.Schema(
  {
    name: String,
    description: String,
    image: String,
    basePrice: Number,

    isAvailable: { type: Boolean, default: true },
    inMenu: { type: Boolean, default: true },
    isDeleted: { type: Boolean, default: false },

    foodType: {
      type: String,
      enum: ["VEG", "NON_VEG"],
      required: true,
    },

    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },

    sizes: [{ type: mongoose.Schema.Types.ObjectId, ref: "DishSize" }],
    addons: [{ type: mongoose.Schema.Types.ObjectId, ref: "DishAddon" }],
    ratings: [{ type: mongoose.Schema.Types.ObjectId, ref: "DishRating" }],

    allergens: [String],
  },
  { timestamps: true }
);

export default mongoose.model("Dish", dishSchema);