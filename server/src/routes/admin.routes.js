import express from "express"
import { authMiddleware, requireRole } from "../middleware/auth.middleware.js";
import { addDish } from "../controllers/admin.controller.js";
import { upload } from "../middleware/upload.middleware.js";


const adminRoutes = express.Router();


adminRoutes.post("/addDish", authMiddleware, requireRole("ADMIN"), upload.single("image"), addDish )


export default adminRoutes;