import { useEffect, useState } from "react"
import { useAuth } from "../../../context/AuthContext"
import { getAllOrders } from "../../../services/order.service"
import { Link } from "react-router-dom"
function Dashboard() {

    const { user } = useAuth()

    const [ordersCount, setOrdersCount] = useState(0)
    const [loading, setLoading] = useState(true)

    useEffect(() => {

        if (!user || user.role !== "admin") {
            return
        }

        const loadOrdersCount = async () => {

            try {

                const data = await getAllOrders()

                setOrdersCount(data.orders.length)

            } catch (error) {

                console.error(
                    "Failed to fetch orders count:",
                    error
                )

            } finally {

                setLoading(false)

            }
        }

        loadOrdersCount()

    }, [user])

    if (!user) {
        return (
            <main className="min-h-screen px-4 py-16">
                <div className="mx-auto max-w-5xl">

                    <p className="font-mono text-sm text-gray-400">
                        / admin
                    </p>

                    <h1 className="mt-4 text-3xl font-bold text-gray-900">
                        Please login first
                    </h1>

                </div>
            </main>
        )
    }

    if (user.role !== "admin") {
        return (
            <main className="min-h-screen px-4 py-16">
                <div className="mx-auto max-w-5xl">

                    <p className="font-mono text-sm text-gray-400">
                        / admin
                    </p>

                    <h1 className="mt-4 text-3xl font-bold text-gray-900">
                        Access Denied
                    </h1>

                    <p className="mt-3 text-gray-500">
                        You do not have permission to access the admin dashboard.
                    </p>

                </div>
            </main>
        )
    }

    return (
        <main className="min-h-screen px-4 py-16">

            <div className="mx-auto max-w-7xl">

                {/* Header */}
                <div>

                    <p className="font-mono text-sm text-gray-400">
                        / admin
                    </p>

                    <h1 className="mt-3 text-4xl font-bold tracking-tight text-gray-900 md:text-5xl">
                        Admin Dashboard
                    </h1>

                    <p className="mt-4 text-gray-600">
                        Manage the platform from one place.
                    </p>

                </div>

                {/* Admin Access */}
                <div className="mt-10 rounded-2xl border border-gray-200 bg-black p-6 text-white">

                    <p className="font-mono text-xs text-gray-400">
                        ADMIN ACCESS
                    </p>

                    <h2 className="mt-3 text-2xl font-semibold">
                        Welcome, Administrator
                    </h2>

                    <p className="mt-2 text-sm text-gray-400">
                        You have administrator access to this platform.
                    </p>

                </div>

                {/* Stats */}
                <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">

                    <Link
                        to="/admin/orders"
                        className="block rounded-2xl border border-gray-200 bg-white p-6 transition hover:-translate-y-1 hover:border-gray-300 hover:shadow-md"
                    >
                        <p className="font-mono text-xs text-gray-400">
                            ORDERS
                        </p>

                        <p className="mt-3 text-3xl font-bold text-gray-900">
                            {loading ? "..." : ordersCount}
                        </p>

                        <p className="mt-2 text-sm text-gray-500">
                            View and manage orders →
                        </p>
                    </Link>

                    {/* Products */}
                    <div className="rounded-2xl border border-gray-200 bg-white p-6">

                        <p className="font-mono text-xs text-gray-400">
                            PRODUCTS
                        </p>

                        <p className="mt-3 text-3xl font-bold text-gray-900">
                            —
                        </p>

                        <p className="mt-2 text-sm text-gray-500">
                            Product management
                        </p>

                    </div>

                    {/* Users */}
                    <div className="rounded-2xl border border-gray-200 bg-white p-6">

                        <p className="font-mono text-xs text-gray-400">
                            USERS
                        </p>

                        <p className="mt-3 text-3xl font-bold text-gray-900">
                            —
                        </p>

                        <p className="mt-2 text-sm text-gray-500">
                            User management
                        </p>

                    </div>

                    {/* Feedback */}
                    <div className="rounded-2xl border border-gray-200 bg-white p-6">

                        <p className="font-mono text-xs text-gray-400">
                            FEEDBACK
                        </p>

                        <p className="mt-3 text-3xl font-bold text-gray-900">
                            —
                        </p>

                        <p className="mt-2 text-sm text-gray-500">
                            Feedback management
                        </p>

                    </div>

                </div>

            </div>

        </main>
    )
}

export default Dashboard