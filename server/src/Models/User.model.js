import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: String,
    email: { type: String, unique: true, required: true },
    phone: String,
    image: String,

    role: {
      type: String,
      enum: ["ADMIN", "USER", "DELEVERYBOY", "RESTURANT"],
      default: "USER",
    },

    password: String,
    googleId: { type: String, unique: true, sparse: true },

    ratings: [
      { type: mongoose.Schema.Types.ObjectId, ref: "DishRating" },
    ],
  },
  { timestamps: true }
);

export default mongoose.model("User", userSchema);