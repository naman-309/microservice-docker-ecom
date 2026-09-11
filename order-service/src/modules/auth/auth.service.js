import bcrypt from "bcrypt";
import prisma from "../../config/db.js";

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
export { registerUser, loginUser };