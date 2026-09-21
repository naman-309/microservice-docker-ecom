import express from "express";
import {
    createOrder,
    getMyOrders,
    getAllOrders,
    getOrderById,
    updateOrderStatus,
    deleteOrder,
} from "./order.controller.js";
import authenticateUser from "../../middleware/auth.middleware.js";
import authorizeRoles from "../../middleware/authorize.middleware.js";
const router = express.Router();

// Create Order
router.post("/", authenticateUser, createOrder);

// Get My Orders
router.get("/", authenticateUser, getMyOrders);
// Get All Orders - Admin only
router.get(
    "/admin",
    authenticateUser,
    authorizeRoles("admin"),
    getAllOrders
);
// Get Single Order
router.get("/:id", authenticateUser, getOrderById);

// Update Order Status (Admin only)
router.put(
    "/:id",
    authenticateUser,
    authorizeRoles("admin"),
    updateOrderStatus
);

// Delete Order
router.delete("/:id", authenticateUser, deleteOrder);
export default router;