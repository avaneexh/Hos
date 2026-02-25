import jwt from "jsonwebtoken";
import User from "../models/User.model.js";


export const authMiddleware = async (req, res, next) => {
  try {
    const token = req.cookies?.jwt;

    // console.log("token:", token);

    if (!token) {
      return res.status(401).json({
        message: "Unauthorized - No token provided",
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findById(decoded.id).select(
      "_id image name email role"
    );

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    req.user = {
      id: user._id,
      image: user.image,
      name: user.name,
      email: user.email,
      role: user.role,
    };

    next();
  } catch (error) {
    console.log("Auth Error:", error.message);
    return res.status(401).json({
      message: "Unauthorized - Invalid token",
    });
  }
};


export const requireRole = (...allowedRoles) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({
        message: "Unauthorized",
      });
    }

    if (!allowedRoles.includes(req.user.role)) {
      return res.status(403).json({
        message: "Access denied",
      });
    }

    next();
  };
};