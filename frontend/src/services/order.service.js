import api from "./api"

// Get My Orders
export const getMyOrders = async () => {
    const response = await api.get("/orders")
    return response.data
}

// Create Order
export const createOrder = async (orderData) => {
    const response = await api.post("/orders", orderData)
    return response.data
}

// Get All Orders - Admin
export const getAllOrders = async () => {
    const response = await api.get("/orders/admin")
    return response.data
}

// Update Order Status - Admin
export const updateOrderStatus = async (orderId, status) => {
    const response = await api.put(`/orders/${orderId}`, {
        status,
    })

    return response.data
}