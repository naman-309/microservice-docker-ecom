import {
    createOrder as createOrderService,
    getMyOrders as getMyOrdersService,
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
export {
    createOrder,
    getMyOrders,
};