import express from "express"
import { authMiddleware, requireRole } from "../middleware/auth.middleware.js";
import { addDish, changeDishAvailability, deleteDish, editDish, getAllCategories, toggleDishInMenu } from "../controllers/admin.controller.js";
import { upload } from "../middleware/upload.middleware.js";


const adminRoutes = express.Router();


adminRoutes.post("/addDish", authMiddleware, requireRole("ADMIN"), upload.single("image"), addDish);
adminRoutes.put("/dish/:id", authMiddleware, requireRole("ADMIN"), upload.single("image"), editDish);
adminRoutes.patch("/dish/:id/availability", authMiddleware, requireRole("ADMIN"), changeDishAvailability);
adminRoutes.patch("/dish/:id/inMenu", authMiddleware, requireRole("ADMIN"), toggleDishInMenu);
adminRoutes.patch("/dish/:id/delete", authMiddleware, requireRole("ADMIN"), deleteDish);
adminRoutes.get("/categories", authMiddleware, requireRole("ADMIN"), getAllCategories);




export default adminRoutes;