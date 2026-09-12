import express from "express";

import {
    createOrder,
    getMyOrders,
} from "./order.controller.js";

import authenticateUser from "../../middleware/auth.middleware.js";

const router = express.Router();

// Create Order
router.post("/", authenticateUser, createOrder);

// Get My Orders
router.get("/", authenticateUser, getMyOrders);

export default router;