import cors from "cors";
import express from "express";
import productRoutes from "./modules/product/product.routes.js";

const app = express();
app.use(
    cors({
        origin: "http://localhost:5173",
        credentials: true,
    })
)
// Parse JSON bodycd .
app.use(express.json());

// Health check
app.get("/", (req, res) => {
    res.json({
        message: "Product Service is running",
    });
});

// Product routes
app.use("/api/products", productRoutes);

export default app;