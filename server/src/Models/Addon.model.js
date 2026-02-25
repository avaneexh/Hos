import mongoose from "mongoose";

const addonSchema = new mongoose.Schema(
  {
    name: { type: String, unique: true },
    price: Number,

    dishes: [{ type: mongoose.Schema.Types.ObjectId, ref: "DishAddon" }],
  },
  { timestamps: true }
);

export default mongoose.model("Addon", addonSchema);