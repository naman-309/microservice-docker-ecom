import axios from "axios"
import prisma from "../../config/db.js"
import { redisClient } from "../../config/redis.js"
import { publishOrderCreated } from "../../events/order.events.js"


// Create Order
const createOrder = async (userId, orderData) => {
    const { items } = orderData

    // Order items check karo
    if (!items || items.length === 0) {
        throw new Error("Order items are required")
    }

    let totalAmount = 0
    const orderItems = []

    // Har product ko check karna
    for (const item of items) {

        // Product Service se product lena
        const response = await axios.get(
            `http://product-service:4001/api/products/${item.productId}`
        )

        const product = response.data.data

        // Stock check
        if (product.stock < item.quantity) {
            throw new Error(
                `Not enough stock for ${product.name}`
            )
        }

        // Total calculate
        const itemTotal =
            product.price * item.quantity

        totalAmount = totalAmount + itemTotal

        // OrderItem ke liye data
        orderItems.push({
            productId: product.id,
            quantity: item.quantity,
            price: product.price,
        })
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
    })

    // Publish order created event
    await publishOrderCreated({
        orderId: order.id,
        userId: order.userId,
        items: order.items,
        totalAmount: order.totalAmount,
    })

    // Old orders cache delete karo
    await redisClient.del(
        `orders:${userId}`
    )

    return order
}


// Get My Orders
const getMyOrders = async (userId) => {

    // User ke orders ke liye Redis key
    const cacheKey = `orders:${userId}`

    // Pehle Redis me check karo
    const cachedOrders =
        await redisClient.get(cacheKey)

    // Agar Redis me data mil gaya
    if (cachedOrders) {
        console.log(
            `Orders cache hit: ${cacheKey}`
        )

        return JSON.parse(cachedOrders)
    }

    console.log(
        `Orders cache miss: ${cacheKey}`
    )

    // Redis me data nahi mila
    // Database se orders lao
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
    })

    // Database se mile orders Redis me save karo
    await redisClient.set(
        cacheKey,
        JSON.stringify(orders)
    )

    return orders
}


// Get All Orders - Admin
const getAllOrders = async () => {

    const orders = await prisma.order.findMany({
        include: {
            items: true,
        },

        orderBy: {
            createdAt: "desc",
        },
    })

    return orders
}


// Get Single Order
const getOrderById = async (
    userId,
    orderId
) => {

    const order = await prisma.order.findFirst({
        where: {
            id: orderId,
            userId,
        },

        include: {
            items: true,
        },
    })

    if (!order) {
        throw new Error("Order not found")
    }

    return order
}


// Update Order Status - Admin
const updateOrderStatus = async (
    orderId,
    status
) => {

    // Pehle order find karo
    // Isse userId bhi milega
    const order = await prisma.order.findUnique({
        where: {
            id: orderId,
        },
    })

    // Order nahi mila
    if (!order) {
        throw new Error("Order not found")
    }

    // Status update karo
    const updatedOrder =
        await prisma.order.update({
            where: {
                id: orderId,
            },

            data: {
                status,
            },
        })

    // IMPORTANT:
    // User ke cached orders ko delete karo
    await redisClient.del(
        `orders:${order.userId}`
    )

    console.log(
        `Orders cache invalidated: orders:${order.userId}`
    )

    // Updated order return karo
    return updatedOrder
}


// Delete Order
const deleteOrder = async (
    userId,
    orderId,
    role
) => {

    let order

    // Admin kisi bhi order ko delete kar sakta hai
    if (role === "admin") {

        order = await prisma.order.findUnique({
            where: {
                id: orderId,
            },

            include: {
                items: true,
            },
        })

    } else {

        // Normal user sirf apna order delete kar sakta hai
        order = await prisma.order.findFirst({
            where: {
                id: orderId,
                userId,
            },

            include: {
                items: true,
            },
        })
    }

    if (!order) {
        throw new Error("Order not found")
    }

    // Order items delete karo
    await prisma.orderItem.deleteMany({
        where: {
            orderId,
        },
    })

    // Main order delete karo
    const deletedOrder =
        await prisma.order.delete({
            where: {
                id: orderId,
            },
        })

    // User ke order cache ko clear karo
    await redisClient.del(
        `orders:${order.userId}`
    )

    return deletedOrder
}


export {
    createOrder,
    getMyOrders,
    getAllOrders,
    getOrderById,
    updateOrderStatus,
    deleteOrder,
}