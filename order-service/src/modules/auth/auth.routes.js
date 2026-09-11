import express from "express";
import {
    register,
    login,
    getProfile,
    logout,
    forgotPassword,
    verifyOtp,
    resetPassword,
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

// Forgot Password
router.post("/forgot-password", forgotPassword);
// Verify OTP
router.post("/verify-otp", verifyOtp);
// Reset Password
router.post("/reset-password", resetPassword);
export default router;