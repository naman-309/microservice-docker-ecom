import {
    createOrder as createOrderService,
    getMyOrders as getMyOrdersService,
    getAllOrders as getAllOrdersService,
    getOrderById as getOrderByIdService,
    updateOrderStatus as updateOrderStatusService,
    deleteOrder as deleteOrderService,
} from "./order.service.js"


// Create Order
const createOrder = async (req, res, next) => {
    try {
        const userId = req.user.userId
        const { items } = req.body

        const order = await createOrderService(userId, {
            items,
        })

        res.status(201).json({
            message: "Order created successfully",
            order,
        })
    } catch (error) {
        next(error)
    }
}


// Get My Orders
const getMyOrders = async (req, res, next) => {
    try {
        const userId = req.user.userId

        const orders = await getMyOrdersService(userId)

        res.status(200).json({
            message: "Orders fetched successfully",
            orders,
        })
    } catch (error) {
        next(error)
    }
}


// Get All Orders - Admin
const getAllOrders = async (req, res, next) => {
    try {
        const orders = await getAllOrdersService()

        res.status(200).json({
            message: "All orders fetched successfully",
            orders,
        })
    } catch (error) {
        next(error)
    }
}


// Get Single Order
const getOrderById = async (req, res, next) => {
    try {
        const userId = req.user.userId
        const orderId = req.params.id

        const order = await getOrderByIdService(
            userId,
            orderId
        )

        res.status(200).json({
            message: "Order fetched successfully",
            order,
        })
    } catch (error) {
        next(error)
    }
}


// Update Order Status - Admin
const updateOrderStatus = async (req, res, next) => {
    try {
        const orderId = req.params.id
        const { status } = req.body

        const order = await updateOrderStatusService(
            orderId,
            status
        )

        res.status(200).json({
            message: "Order status updated successfully",
            order,
        })
    } catch (error) {
        next(error)
    }
}


// Delete Order
const deleteOrder = async (req, res, next) => {
    try {
        const userId = req.user.userId
        const role = req.user.role
        const orderId = req.params.id

        const order = await deleteOrderService(
            userId,
            orderId,
            role
        )

        res.status(200).json({
            message: "Order deleted successfully",
            order,
        })
    } catch (error) {
        next(error)
    }
}


export {
    createOrder,
    getMyOrders,
    getAllOrders,
    getOrderById,
    updateOrderStatus,
    deleteOrder,
}