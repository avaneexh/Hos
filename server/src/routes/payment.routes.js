import express from "express";
import { createCheckoutSession } from './../controllers/payment.controller.js';
import { authMiddleware } from './../middleware/auth.middleware.js';



const paymentRoute = express.Router()

paymentRoute.post("/createCheckoutSession", authMiddleware, createCheckoutSession);

export default paymentRoute;
