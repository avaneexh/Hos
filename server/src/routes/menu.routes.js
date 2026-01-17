import express from "express";
import { getMenu, getMenuCategories } from "../controllers/menu.controller.js";

const menuRoutes = express.Router();

menuRoutes.get("/menu", getMenu);
menuRoutes.get("/categories", getMenuCategories);

export default menuRoutes;
