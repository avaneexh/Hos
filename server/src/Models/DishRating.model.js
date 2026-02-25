import mongoose from "mongoose";

const dishRatingSchema = new mongoose.Schema(
  {
    rating: { type: Number, required: true },
    review: String,

    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    dish: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Dish",
      required: true,
    },
  },
  { timestamps: true }
);

dishRatingSchema.index({ user: 1, dish: 1 }, { unique: true });

export default mongoose.model("DishRating", dishRatingSchema);