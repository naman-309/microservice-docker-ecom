import jwt from "jsonwebtoken";
import { registerUser, loginUser } from "./auth.service.js";

// Register User
const register = async (req, res, next) => {
    try {
        const user = await registerUser(req.body);

        res.status(201).json({
            message: "User registered successfully",
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
                role: user.role,
            },
        });
    } catch (error) {
        next(error);
    }
};

// Login User
const login = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        const user = await loginUser(email, password);

        // Create JWT token
        const token = jwt.sign(
            {
                userId: user.id,
                role: user.role,
            },
            process.env.JWT_SECRET,
            {
                expiresIn: "1d",
            }
        );

        // Save JWT in HTTP-only cookie
        res.cookie("token", token, {
            httpOnly: true,
            secure: false,
            sameSite: "lax",
        });

        res.status(200).json({
            message: "Login successful",
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
                role: user.role,
            },
        });
    } catch (error) {
        next(error);
    }
};

// profile
const getProfile = async (req, res, next) => {
    try {
        res.status(200).json({
            message: "Profile fetched successfully",
            user: req.user,
        });
    } catch (error) {
        next(error);
    }
};
//logout
const logout = async (req, res, next) => {
    try {
        // JWT cookie ko remove karna
        res.clearCookie("token");

        res.status(200).json({
            message: "Logout successful",
        });
    } catch (error) {
        next(error);
    }
};

export { register, login, getProfile, logout };