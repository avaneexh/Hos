import express from "express"
import { authMiddleware, requireRole } from "../middleware/auth.middleware.js";
import { addDish, changeDishAvailability, editDish, toggleDishInMenu } from "../controllers/admin.controller.js";
import { upload } from "../middleware/upload.middleware.js";


const adminRoutes = express.Router();


adminRoutes.post("/addDish", authMiddleware, requireRole("ADMIN"), upload.single("image"), addDish )
adminRoutes.post("/editDish", authMiddleware, requireRole("ADMIN"), editDish )
adminRoutes.post("/changeDishAvailability", authMiddleware, requireRole("ADMIN"), changeDishAvailability )
adminRoutes.post("/toggleDishInMenu", authMiddleware, requireRole("ADMIN"), toggleDishInMenu )


export default adminRoutes;