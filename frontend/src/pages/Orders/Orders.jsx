import { useEffect, useState } from "react"

import {
    getMyOrders,
    deleteOrder,
} from "../../services/order.service"

function Orders() {
    const [orders, setOrders] = useState([])
    const [loading, setLoading] = useState(true)
    const [errorMessage, setErrorMessage] = useState("")
    const [deletingOrderId, setDeletingOrderId] = useState(null)

    const loadOrders = async () => {
        try {
            setLoading(true)
            setErrorMessage("")

            const data = await getMyOrders()

            console.log("My orders:", data.orders)

            setOrders(data.orders)
        } catch (error) {
            console.error(
                "Failed to fetch orders:",
                error
            )

            setErrorMessage(
                error.response?.data?.message ||
                "Failed to load your orders."
            )
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        loadOrders()
    }, [])

    const handleDeleteOrder = async (orderId) => {
        const confirmed = window.confirm(
            "Are you sure you want to delete this order?"
        )

        if (!confirmed) {
            return
        }

        try {
            setDeletingOrderId(orderId)
            setErrorMessage("")

            await deleteOrder(orderId)

            setOrders((currentOrders) =>
                currentOrders.filter(
                    (order) => order.id !== orderId
                )
            )
        } catch (error) {
            console.error(
                "Failed to delete order:",
                error
            )

            setErrorMessage(
                error.response?.data?.message ||
                "Failed to delete order."
            )
        } finally {
            setDeletingOrderId(null)
        }
    }

    return (
        <main className="min-h-screen px-4 py-16">
            <div className="mx-auto max-w-6xl">

                {/* Header */}
                <div>
                    <p className="font-mono text-sm text-gray-400">
                        / orders
                    </p>

                    <h1 className="mt-3 text-4xl font-bold tracking-tight text-gray-900">
                        My Orders
                    </h1>

                    <p className="mt-3 text-gray-500">
                        View and manage your orders.
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
                    <div className="mt-10 rounded-2xl border border-gray-200 bg-gray-50 px-6 py-20 text-center">
                        <div className="mx-auto h-8 w-8 animate-spin rounded-full border-2 border-gray-200 border-t-black" />

                        <p className="mt-5 font-mono text-xs uppercase tracking-widest text-gray-400">
                            Loading orders
                        </p>

                        <h2 className="mt-2 text-xl font-semibold text-gray-900">
                            Getting your orders...
                        </h2>
                    </div>
                )}

                {/* Empty */}
                {!loading &&
                    !errorMessage &&
                    orders.length === 0 && (
                        <div className="mt-10 rounded-2xl border border-gray-200 bg-gray-50 px-6 py-20 text-center">
                            <p className="font-mono text-xs uppercase tracking-widest text-gray-400">
                                / no orders
                            </p>

                            <h2 className="mt-3 text-2xl font-semibold text-gray-900">
                                You haven't placed any orders yet.
                            </h2>

                            <p className="mx-auto mt-3 max-w-md text-sm text-gray-500">
                                Once you place an order, it will appear here.
                            </p>
                        </div>
                    )}

                {/* Orders */}
                {!loading &&
                    !errorMessage &&
                    orders.length > 0 && (
                        <div className="mt-10 space-y-5">
                            {orders.map((order) => (
                                <div
                                    key={order.id}
                                    className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm"
                                >
                                    <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">

                                        {/* Order Info */}
                                        <div>
                                            <p className="font-mono text-xs uppercase tracking-wider text-gray-400">
                                                Order ID
                                            </p>

                                            <p className="mt-1 break-all font-mono text-sm text-gray-900">
                                                {order.id}
                                            </p>

                                            <p className="mt-3 text-sm text-gray-500">
                                                {order.items?.length || 0} item(s)
                                            </p>
                                        </div>

                                        {/* Status */}
                                        <div>
                                            <p className="text-xs text-gray-400">
                                                Status
                                            </p>

                                            <span className="mt-2 inline-block rounded-full bg-gray-100 px-3 py-1 text-xs font-medium uppercase text-gray-700">
                                                {order.status}
                                            </span>
                                        </div>

                                        {/* Total */}
                                        <div>
                                            <p className="text-xs text-gray-400">
                                                Total
                                            </p>

                                            <p className="mt-1 text-xl font-bold text-gray-900">
                                                ₹{order.totalAmount?.toLocaleString("en-IN")}
                                            </p>
                                        </div>

                                        {/* Delete */}
                                        <button
                                            type="button"
                                            onClick={() =>
                                                handleDeleteOrder(order.id)
                                            }
                                            disabled={
                                                deletingOrderId === order.id
                                            }
                                            className="rounded-xl border border-red-200 px-4 py-2 text-sm font-medium text-red-500 transition hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-50"
                                        >
                                            {deletingOrderId === order.id
                                                ? "Deleting..."
                                                : "Delete Order"}
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}

            </div>
        </main>
    )
}

export default Orders
