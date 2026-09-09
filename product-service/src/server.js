import dotenv from "dotenv";
import app from "./app.js";
import { connectRedis } from "./config/redis.js";

dotenv.config();

const PORT = process.env.PORT || 4001;

// Start application
const startServer = async () => {
    try {
        // Connect Redis before starting server
        await connectRedis();

        // Start Express server
        app.listen(PORT, () => {
            console.log(`Product Service running on port ${PORT}`);
        });
    } catch (error) {
        console.error("Server failed to start:", error);
        process.exit(1);
    }
};

startServer();