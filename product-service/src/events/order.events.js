import { createClient } from "redis";
import dotenv from "dotenv";
import { reduceProductStock } from "../modules/product/product.service.js";

dotenv.config();

const subscriber = createClient({
    url: process.env.REDIS_URL,
});

subscriber.on("error", (error) => {
    console.error("Redis Subscriber Error:", error);
});

const connectOrderEvents = async () => {
    await subscriber.connect();

    console.log("Redis Subscriber connected");

    await subscriber.subscribe("order.created", async (message) => {
        const orderData = JSON.parse(message);

        console.log("Order created event received:");
        console.log(orderData);

        for (const item of orderData.items) {
            await reduceProductStock(
                item.productId,
                item.quantity
            );
        }
    });
};

export default connectOrderEvents;