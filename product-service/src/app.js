import express from "express";

const app = express();

// Parse JSON request body
app.use(express.json());

// Test route
app.get("/", (req, res) => {
    res.json({
        message: "Product Service is running",
    });
});

export default app;