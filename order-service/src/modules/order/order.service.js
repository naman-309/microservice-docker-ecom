import axios from "axios";
import prisma from "../../config/db.js";
import { redisClient } from "../../config/redis.js";
// Create Order
const createOrder = async (userId, orderData) => {
    const { items } = orderData;

    // Order items check karo
    if (!items || items.length === 0) {
        throw new Error("Order items are required");
    }

    let totalAmount = 0;
    const orderItems = [];

    // Har product ko check karna
    for (const item of items) {

        // Product Service se product lena
        const response = await axios.get(
            `http://localhost:4001/api/products/${item.productId}`
        );

        const product = response.data.data;

        // Stock check
        if (product.stock < item.quantity) {
            throw new Error(`Not enough stock for ${product.name}`);
        }

        // Total calculate
        const itemTotal = product.price * item.quantity;

        totalAmount = totalAmount + itemTotal;

        // OrderItem ke liye data
        orderItems.push({
            productId: product.id,
            quantity: item.quantity,
            price: product.price,
        });
    }

    // Order database me save karo
    const order = await prisma.order.create({
        data: {
            userId,
            totalAmount,

            items: {
                create: orderItems,
            },
        },

        include: {
            items: true,
        },
    });
    // Old orders cache delete karo
    await redisClient.del(`orders:${userId}`);

    return order
};
// Get My Orders
// Get My Orders
const getMyOrders = async (userId) => {

    // User ke orders ke liye Redis key
    const cacheKey = `orders:${userId}`;

    // Pehle Redis me check karo
    const cachedOrders = await redisClient.get(cacheKey);

    // Agar Redis me data mil gaya
    if (cachedOrders) {
        return JSON.parse(cachedOrders);
    }

    // Redis me data nahi mila to database se orders lao
    const orders = await prisma.order.findMany({
        where: {
            userId,
        },

        include: {
            items: true,
        },

        orderBy: {
            createdAt: "desc",
        },
    });

    // Database se mile orders Redis me save karo
    await redisClient.set(
        cacheKey,
        JSON.stringify(orders)
    );

    return orders;
};

export {
    createOrder,
    getMyOrders,
};