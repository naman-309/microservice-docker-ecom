import dotenv from "dotenv";
import app from "./app.js";
import { connectRedis } from "./config/redis.js";

dotenv.config();

const PORT = process.env.PORT || 4002;

const startServer = async () => {
    try {
        await connectRedis();

        app.listen(PORT, () => {
            console.log(`Order Service running on port ${PORT}`);
        });
    } catch (error) {
        console.error("Server failed to start:", error);
        process.exit(1);
    }
};

startServer();