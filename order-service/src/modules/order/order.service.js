import axios from "axios";
import prisma from "../../config/db.js";
import { redisClient } from "../../config/redis.js";
import { publishOrderCreated } from "../../events/order.events.js";
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

    // Publish order created event
    await publishOrderCreated({
        orderId: order.id,
        userId: order.userId,
        items: order.items,
        totalAmount: order.totalAmount,
    });
    // Old orders cache delete karo
    await redisClient.del(`orders:${userId}`);

    return order
};
// Get My all Orders
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

// Get Single Order
const getOrderById = async (userId, orderId) => {

    // User ka specific order database se find karo
    const order = await prisma.order.findFirst({
        where: {
            id: orderId,
            userId,
        },

        include: {
            items: true,
        },
    });

    // Agar order nahi mila
    if (!order) {
        throw new Error("Order not found");
    }

    return order;
};
//// Update Order Status
const updateOrderStatus = async (orderId, status) => {

    // Order find karo
    const order = await prisma.order.findUnique({
        where: {
            id: orderId,
        },
    });

    // Order nahi mila
    if (!order) {
        throw new Error("Order not found");
    }

    // Status update karo
    const updatedOrder = await prisma.order.update({
        where: {
            id: orderId,
        },

        data: {
            status,
        },
    });

    // Updated order return karo
    return updatedOrder;
};

// Delete Order
const deleteOrder = async (userId, orderId) => {

    // 1. User ka order find karo
    const order = await prisma.order.findFirst({
        where: {
            id: orderId,
            userId,
        },
        include: {
            items: true,
        },
    });

    if (!order) {
        throw new Error("Order not found");
    }

    // 2. Har product ka stock wapas add karo
    for (const item of order.items) {

        const response = await axios.get(
            `http://localhost:4001/api/products/${item.productId}`
        );

        const product = response.data.data;

        const newStock = product.stock + item.quantity;

        await axios.put(
            `http://localhost:4001/api/products/${item.productId}`,
            {
                stock: newStock,
            }
        );
    }

    // 3. Pehle OrderItems delete karo
    await prisma.orderItem.deleteMany({
        where: {
            orderId,
        },
    });

    // 4. Ab main Order delete karo
    const deletedOrder = await prisma.order.delete({
        where: {
            id: orderId,
        },
    });

    // 5. Redis cache invalidate karo
    await redisClient.del(`orders:${userId}`);

    return deletedOrder;
};

export {
    createOrder,
    getMyOrders,
    getOrderById,
    updateOrderStatus,
    deleteOrder,
};