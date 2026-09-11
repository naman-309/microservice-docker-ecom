import bcrypt from "bcrypt";
import prisma from "../../config/db.js";
import transporter from "../../config/mail.js";
import jwt from "jsonwebtoken";
const registerUser = async (userData) => {
    const { name, email, password } = userData;

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
        where: {
            email,
        },
    });

    if (existingUser) {
        throw new Error("User already exists");
    }

    // Password ko hash karna
    const hashedPassword = await bcrypt.hash(password, 10);

    // User ko database mein create karna
    const user = await prisma.user.create({
        data: {
            name,
            email,
            password: hashedPassword,
        },
    });

    return user;
};

//login 
const loginUser = async (email, password) => {
    // User ko email se find karo
    const user = await prisma.user.findUnique({
        where: {
            email,
        },
    });

    if (!user) {
        throw new Error("Invalid email or password");
    }

    // Request wala password aur DB wala hashed password compare karo
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
        throw new Error("Invalid email or password");
    }

    return user;
};

// forgot password api working
const generateOtp = () => {
    return Math.floor(100000 + Math.random() * 900000).toString();
};

const forgotPassword = async (email) => {
    // User ko email se find karo
    const user = await prisma.user.findUnique({
        where: {
            email,
        },
    });

    if (!user) {
        throw new Error("User not found");
    }

    // 6 digit OTP generate
    const otp = generateOtp();

    // OTP 2 minutes ke liye valid
    const expiresAt = new Date(Date.now() + 2 * 60 * 1000);

    // Purane OTP delete karo
    await prisma.passwordReset.deleteMany({
        where: {
            userId: user.id,
        },
    });

    // New OTP save karo
    await prisma.passwordReset.create({
        data: {
            userId: user.id,
            otp,
            expiresAt,
        },
    });
    // OTP email par send karna
    await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: email,
        subject: "Password Reset OTP",
        text: `Your password reset OTP is ${otp}. This OTP is valid for 2 minutes.`,
    });

    return otp;


};
// verify otp
const verifyOtp = async (email, otp) => {
    // Email se user find karo
    const user = await prisma.user.findUnique({
        where: {
            email,
        },
    });

    if (!user) {
        throw new Error("User not found");
    }

    // User ka OTP record find karo
    const passwordReset = await prisma.passwordReset.findFirst({
        where: {
            userId: user.id,
        },
    });

    if (!passwordReset) {
        throw new Error("OTP not found");
    }

    // OTP expire hua hai ya nahi
    if (new Date() > passwordReset.expiresAt) {
        await prisma.passwordReset.delete({
            where: {
                id: passwordReset.id,
            },
        });

        throw new Error("OTP expired");
    }

    // OTP check
    if (passwordReset.otp !== otp) {
        throw new Error("Invalid OTP");
    }

    // OTP correct hai, isliye delete kar do
    await prisma.passwordReset.delete({
        where: {
            id: passwordReset.id,
        },
    });

    // Reset token create karo
    const resetToken = jwt.sign(
        {
            userId: user.id,
            purpose: "password-reset",
        },
        process.env.JWT_SECRET,
        {
            expiresIn: "10m",
        }
    );

    return resetToken;
};

// Reset Password
const resetPassword = async (resetToken, newPassword) => {
    // Reset token verify karo
    const decoded = jwt.verify(
        resetToken,
        process.env.JWT_SECRET
    );

    // Check karo token password reset ke liye hi hai
    if (decoded.purpose !== "password-reset") {
        throw new Error("Invalid reset token");
    }

    // New password ko hash karo
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // User ka password update karo
    await prisma.user.update({
        where: {
            id: decoded.userId,
        },
        data: {
            password: hashedPassword,
        },
    });

    return true;
};
export { registerUser, loginUser, forgotPassword, verifyOtp, resetPassword };