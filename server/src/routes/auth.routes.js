import express from "express"
import { check, login, logout, register } from "../controllers/auth.controller.js";
import { authMiddleware } from "../middleware/auth.middleware.js";
import { googleLogin } from "../controllers/auth.google.controller.js";


const authRoutes = express.Router();

authRoutes.post("/register", register)

authRoutes.post("/login", login)

authRoutes.post("/google", googleLogin)

authRoutes.post("/logout", authMiddleware, logout)

authRoutes.get("/check", authMiddleware, check)

export default authRoutes;