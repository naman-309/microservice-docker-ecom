import express from "express";
import {
    createProductController,
    getAllProductsController,
    getProductByIdController,
} from "./product.controller.js";
const router = express.Router();


// Create Product
router.post("/", createProductController);


// Get All Products
router.get("/", getAllProductsController);


// Get Product By ID
router.get("/:id", getProductByIdController);


export default router;
