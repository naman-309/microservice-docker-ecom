import { useEffect, useState } from "react"
import {
    getAllOrders,
    updateOrderStatus,
} from "../../../services/order.service"

function Orders() {

    const [orders, setOrders] = useState([])
    const [loading, setLoading] = useState(true)
    const [errorMessage, setErrorMessage] = useState("")

    const [updatingOrderId, setUpdatingOrderId] = useState(null)

    useEffect(() => {

        const loadOrders = async () => {

            try {

                const data = await getAllOrders()

                console.log("Admin orders:", data.orders)

                setOrders(data.orders)

            } catch (error) {

                console.error("Failed to fetch orders:", error)

                setErrorMessage(
                    error.response?.data?.message ||
                    "Failed to load orders."
                )

            } finally {

                setLoading(false)

            }
        }

        loadOrders()

    }, [])

    const handleStatusChange = (orderId, newStatus) => {

        setOrders((currentOrders) =>
            currentOrders.map((order) =>
                order.id === orderId
                    ? {
                        ...order,
                        status: newStatus,
                    }
                    : order
            )
        )
    }

    const handleUpdateStatus = async (orderId, status) => {

        try {

            setUpdatingOrderId(orderId)

            const data = await updateOrderStatus(
                orderId,
                status
            )

            console.log(
                "Order status updated:",
                data.order
            )

        } catch (error) {

            console.error(
                "Failed to update order status:",
                error
            )

            setErrorMessage(
                error.response?.data?.message ||
                "Failed to update order status."
            )

        } finally {

            setUpdatingOrderId(null)

        }
    }

    return (
        <main className="min-h-screen px-4 py-16">

            <div className="mx-auto max-w-7xl">

                {/* Page Header */}
                <div>
                    <p className="font-mono text-sm text-gray-400">
                        / admin / orders
                    </p>

                    <h1 className="mt-3 text-4xl font-bold tracking-tight text-gray-900">
                        Orders
                    </h1>

                    <p className="mt-4 text-gray-600">
                        View and manage all customer orders.
                    </p>
                </div>

                {/* Error */}
                {errorMessage && (
                    <div className="mt-8 rounded-xl border border-red-200 bg-red-50 px-4 py-3">
                        <p className="text-sm text-red-600">
                            {errorMessage}
                        </p>
                    </div>
                )}

                {/* Loading */}
                {loading && (
                    <div className="mt-10 rounded-2xl border border-gray-200 bg-white p-8 text-center">
                        <p className="text-sm text-gray-500">
                            Loading orders...
                        </p>
                    </div>
                )}

                {/* Empty State */}
                {!loading && orders.length === 0 && !errorMessage && (
                    <div className="mt-10 rounded-2xl border border-gray-200 bg-white p-10 text-center">
                        <p className="text-lg font-medium text-gray-900">
                            No orders found
                        </p>

                        <p className="mt-2 text-sm text-gray-500">
                            There are currently no customer orders.
                        </p>
                    </div>
                )}

                {/* Orders Table */}
                {!loading && orders.length > 0 && (
                    <div className="mt-10 overflow-hidden rounded-2xl border border-gray-200 bg-white">

                        <div className="overflow-x-auto">

                            <table className="w-full min-w-[900px]">

                                <thead className="border-b border-gray-200 bg-gray-50">

                                    <tr>

                                        <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
                                            Order ID
                                        </th>

                                        <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
                                            User ID
                                        </th>

                                        <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
                                            Amount
                                        </th>

                                        <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
                                            Status
                                        </th>

                                        <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
                                            Action
                                        </th>

                                    </tr>

                                </thead>

                                <tbody>

                                    {orders.map((order) => (

                                        <tr
                                            key={order.id}
                                            className="border-b border-gray-100"
                                        >

                                            <td className="px-6 py-5 text-sm font-medium text-gray-900">
                                                {order.id}
                                            </td>

                                            <td className="px-6 py-5 text-sm text-gray-600">
                                                {order.userId}
                                            </td>

                                            <td className="px-6 py-5 text-sm font-medium text-gray-900">
                                                ₹ {order.totalAmount}
                                            </td>

                                            <td className="px-6 py-5">

                                                <select
                                                    value={order.status}
                                                    onChange={(event) =>
                                                        handleStatusChange(
                                                            order.id,
                                                            event.target.value
                                                        )
                                                    }
                                                    className="rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm outline-none focus:border-gray-400"
                                                >

                                                    <option value="PENDING">
                                                        Pending
                                                    </option>

                                                    <option value="PROCESSING">
                                                        Processing
                                                    </option>

                                                    <option value="SHIPPED">
                                                        Shipped
                                                    </option>

                                                    <option value="DELIVERED">
                                                        Delivered
                                                    </option>

                                                    <option value="CANCELLED">
                                                        Cancelled
                                                    </option>

                                                </select>

                                            </td>

                                            <td className="px-6 py-5">

                                                <button
                                                    type="button"
                                                    onClick={() =>
                                                        handleUpdateStatus(
                                                            order.id,
                                                            order.status
                                                        )
                                                    }
                                                    disabled={
                                                        updatingOrderId === order.id
                                                    }
                                                    className="rounded-lg bg-black px-4 py-2 text-xs font-medium text-white transition hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-50"
                                                >

                                                    {updatingOrderId === order.id
                                                        ? "Updating..."
                                                        : "Update"
                                                    }

                                                </button>

                                            </td>

                                        </tr>

                                    ))}

                                </tbody>

                            </table>

                        </div>

                    </div>
                )}

            </div>

        </main>
    )
}

export default Orders