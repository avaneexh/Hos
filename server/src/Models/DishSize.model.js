import mongoose from "mongoose";

const dishSizeSchema = new mongoose.Schema(
  {
    name: String,
    price: Number,

    dish: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Dish",
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("DishSize", dishSizeSchema);