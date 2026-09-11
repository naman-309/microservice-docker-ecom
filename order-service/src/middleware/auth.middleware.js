import jwt from "jsonwebtoken";

const authenticateUser = (req, res, next) => {
    try {
        const token = req.cookies.token;

        // console.log("Token received:", token);

        if (!token) {
            return res.status(401).json({
                message: "Authentication required",
            });
        }

        const decoded = jwt.verify(
            token,
            process.env.JWT_SECRET
        );

        req.user = decoded;

        next();
    } catch (error) {
        console.log("JWT Error:", error.message);

        return res.status(401).json({
            message: "Invalid or expired token",
        });
    }
};
export default authenticateUser;