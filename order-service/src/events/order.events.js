import { createClient } from "redis";
import dotenv from "dotenv";
import prisma from "../config/db.js";
import sendOrderConfirmationEmail from "./order.email.js";

dotenv.config();

const ORDER_CREATED_CHANNEL = "order.created";

// Publisher
const publisher = createClient({
    url: process.env.REDIS_URL,
});

publisher.on("error", (error) => {
    console.error("Redis Publisher Error:", error);
});

// Subscriber
const subscriber = createClient({
    url: process.env.REDIS_URL,
});

subscriber.on("error", (error) => {
    console.error("Redis Subscriber Error:", error);
});

// Connect Publisher
const connectPublisher = async () => {
    await publisher.connect();

    console.log("Redis Publisher connected");
};

// Connect Subscriber
const connectOrderEmailSubscriber = async () => {
    await subscriber.connect();

    console.log("Redis Email Subscriber connected");

    await subscriber.subscribe(
        ORDER_CREATED_CHANNEL,
        async (message) => {
            try {
                const orderData = JSON.parse(message);

                console.log(
                    "Order created event received for email"
                );

                // Find customer
                const user = await prisma.user.findUnique({
                    where: {
                        id: orderData.userId,
                    },
                });

                if (!user) {
                    console.log("User not found");
                    return;
                }

                // Send email
                await sendOrderConfirmationEmail(
                    user.email,
                    orderData
                );

            } catch (error) {
                console.error(
                    "Email event processing failed:",
                    error
                );
            }
        }
    );
};

// Publish Order Created Event
const publishOrderCreated = async (orderData) => {
    await publisher.publish(
        ORDER_CREATED_CHANNEL,
        JSON.stringify(orderData)
    );

    console.log("order.created event published");
};

export {
    connectPublisher,
    connectOrderEmailSubscriber,
    publishOrderCreated,
};