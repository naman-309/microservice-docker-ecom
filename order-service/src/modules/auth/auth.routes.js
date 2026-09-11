import express from "express";
import {
    register,
    login,
    getProfile, logout
} from "./auth.controller.js";

import authenticateUser from "../../middleware/auth.middleware.js";

const router = express.Router();

// Register
router.post("/register", register);

// Login
router.post("/login", login);

// Protected profile
router.get("/profile", authenticateUser, getProfile);
// Logout
router.post("/logout", logout);

export default router;