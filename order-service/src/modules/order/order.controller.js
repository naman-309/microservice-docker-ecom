import {
    createOrder as createOrderService,
    getMyOrders as getMyOrdersService,
    getOrderById as getOrderByIdService,
    updateOrderStatus as updateOrderStatusService,
    deleteOrder as deleteOrderService,
} from "./order.service.js";
// Create Order
const createOrder = async (req, res, next) => {
    try {
        // JWT middleware se userId milega
        const userId = req.user.userId;

        // Request body se order items lena
        const { items } = req.body;

        // Service ko data bhejna
        const order = await createOrderService(userId, {
            items,
        });

        res.status(201).json({
            message: "Order created successfully",
            order,
        });
    } catch (error) {
        next(error);
    }
};

// Get My Orders
const getMyOrders = async (req, res, next) => {
    try {
        // JWT middleware se logged-in user ka id lena
        const userId = req.user.userId;

        // Service ko userId bhejna
        const orders = await getMyOrdersService(userId);

        res.status(200).json({
            message: "Orders fetched successfully",
            orders,
        });
    } catch (error) {
        next(error);
    }
};


// Get Single Order
const getOrderById = async (req, res, next) => {
    try {
        // JWT se logged-in user ki ID
        const userId = req.user.userId;

        // URL se order ID
        const orderId = req.params.id;

        // Service ko userId aur orderId bhejna
        const order = await getOrderByIdService(userId, orderId);

        res.status(200).json({
            message: "Order fetched successfully",
            order,
        });
    } catch (error) {
        next(error);
    }
};

// Update Order Status
const updateOrderStatus = async (req, res, next) => {
    try {
        // URL se order ID
        const orderId = req.params.id;

        // Request body se new status
        const { status } = req.body;

        // Service ko data bhejna
        const order = await updateOrderStatusService(
            orderId,
            status
        );

        res.status(200).json({
            message: "Order status updated successfully",
            order,
        });
    } catch (error) {
        next(error);
    }
};
// Delete Order
const deleteOrder = async (req, res, next) => {
    try {
        // JWT se logged-in user ki ID
        const userId = req.user.userId;

        // URL se order ID
        const orderId = req.params.id;

        // Service ko userId aur orderId bhejna
        const order = await deleteOrderService(
            userId,
            orderId
        );

        res.status(200).json({
            message: "Order deleted successfully",
            order,
        });
    } catch (error) {
        next(error);
    }
};
export {
    createOrder,
    getMyOrders,
    getOrderById,
    updateOrderStatus,
    deleteOrder,
};