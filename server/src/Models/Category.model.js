import mongoose from "mongoose";

const categorySchema = new mongoose.Schema(
  {
    name: { type: String, unique: true },
    image: String,
    order: { type: Number, default: 0 },

    dishes: [{ type: mongoose.Schema.Types.ObjectId, ref: "Dish" }],
  },
  { timestamps: true }
);

export default mongoose.model("Category", categorySchema);