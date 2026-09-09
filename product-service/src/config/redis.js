import { createClient } from "redis";
import dotenv from "dotenv";

dotenv.config();

// Create Redis client
const redisClient = createClient({
    url: process.env.REDIS_URL,
});

// Handle Redis errors
redisClient.on("error", (error) => {
    console.error("Redis Error:", error);
});

// Connect Redis
const connectRedis = async () => {
    try {
        await redisClient.connect();

        console.log("Redis connected successfully");
    } catch (error) {
        console.error("Redis connection failed:", error);
    }
};

export { redisClient, connectRedis };