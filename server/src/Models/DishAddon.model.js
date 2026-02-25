import mongoose from "mongoose";

const dishAddonSchema = new mongoose.Schema(
  {
    dish: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Dish",
      required: true,
    },
    addon: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Addon",
      required: true,
    },
  },
  { timestamps: true }
);

dishAddonSchema.index({ dish: 1, addon: 1 }, { unique: true });

export default mongoose.model("DishAddon", dishAddonSchema);