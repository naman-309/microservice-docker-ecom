const authorizeRoles = (...allowedRoles) => {
    return (req, res, next) => {

        // User ka role JWT se aa raha hai
        const userRole = req.user.role;

        // Check karo ki user ka role allowed hai ya nahi
        if (!allowedRoles.includes(userRole)) {
            return res.status(403).json({
                message: "Admin access required",
            });
        }

        next();
    };
};

export default authorizeRoles;