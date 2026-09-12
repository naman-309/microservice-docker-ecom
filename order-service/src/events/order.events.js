import { redisClient } from "../config/redis.js";

const ORDER_CREATED_CHANNEL = "order.created";

const publishOrderCreated = async (orderData) => {
    await redisClient.publish(
        ORDER_CREATED_CHANNEL,
        JSON.stringify(orderData)
    );

    console.log("order.created event published");
};

export {
    publishOrderCreated,
};