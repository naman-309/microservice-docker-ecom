import { useState } from "react"

import { useCart } from "../../context/CartContext"
import { createOrder } from "../../services/order.service"

function Cart() {
    const {
        cartItems,
        removeFromCart,
        increaseQuantity,
        decreaseQuantity,
    } = useCart()

    const [placingOrder, setPlacingOrder] = useState(false)
    const [errorMessage, setErrorMessage] = useState("")
    const [successMessage, setSuccessMessage] = useState("")

    // Calculate total price
    const totalPrice = cartItems.reduce(
        (total, item) =>
            total + item.product.price * item.quantity,
        0
    )

    // Place Order
    const handlePlaceOrder = async () => {
        if (cartItems.length === 0) {
            return
        }

        try {
            setPlacingOrder(true)
            setErrorMessage("")
            setSuccessMessage("")

            // Convert cart data into backend format
            const orderData = {
                items: cartItems.map((item) => ({
                    productId: item.product.id,
                    quantity: item.quantity,
                })),
            }

            console.log("Creating order:", orderData)

            const data = await createOrder(orderData)

            console.log("Order created:", data)

            setSuccessMessage(
                "Order placed successfully. Confirmation email will be sent shortly."
            )

        } catch (error) {
            console.error(
                "Failed to create order:",
                error
            )

            setErrorMessage(
                error.response?.data?.message ||
                "Failed to place order. Please try again."
            )
        } finally {
            setPlacingOrder(false)
        }
    }

    return (
        <main className="min-h-screen px-4 py-16">

            <div className="mx-auto max-w-7xl">

                {/* Header */}

                <p className="font-mono text-sm text-gray-400">
                    / cart
                </p>

                <h1 className="mt-3 text-4xl font-bold text-gray-900">
                    Your Cart
                </h1>

                {/* Success Message */}

                {successMessage && (
                    <div className="mt-8 rounded-xl border border-green-200 bg-green-50 px-4 py-3">
                        <p className="text-sm text-green-700">
                            {successMessage}
                        </p>
                    </div>
                )}

                {/* Error Message */}

                {errorMessage && (
                    <div className="mt-8 rounded-xl border border-red-200 bg-red-50 px-4 py-3">
                        <p className="text-sm text-red-600">
                            {errorMessage}
                        </p>
                    </div>
                )}

                {/* Empty Cart */}

                {cartItems.length === 0 ? (

                    <div className="mt-10 rounded-2xl border border-gray-200 bg-gray-50 px-6 py-16 text-center">

                        <p className="text-lg font-medium text-gray-900">
                            Your cart is empty
                        </p>

                        <p className="mt-2 text-sm text-gray-500">
                            Add some products to get started.
                        </p>

                    </div>

                ) : (

                    <div className="mt-10 grid gap-8 lg:grid-cols-[1fr_320px]">

                        {/* Cart Items */}

                        <div className="space-y-4">

                            {cartItems.map((item) => {

                                const product = item.product

                                return (
                                    <div
                                        key={product.id}
                                        className="flex flex-col gap-5 rounded-2xl border border-gray-200 bg-white p-5 sm:flex-row sm:items-center"
                                    >

                                        {/* Product Image */}

                                        <img
                                            src={product.imageUrl}
                                            alt={product.name}
                                            className="h-28 w-full rounded-xl object-cover sm:h-24 sm:w-24"
                                        />

                                        {/* Product Information */}

                                        <div className="flex-1">

                                            <h2 className="font-semibold text-gray-900">
                                                {product.name}
                                            </h2>

                                            <p className="mt-2 font-medium">
                                                ₹{product.price.toLocaleString("en-IN")}
                                            </p>

                                            {/* Quantity Controls */}

                                            <div className="mt-4 flex items-center gap-3">

                                                <button
                                                    type="button"
                                                    onClick={() =>
                                                        decreaseQuantity(product.id)
                                                    }
                                                    disabled={placingOrder}
                                                    className="flex h-9 w-9 items-center justify-center rounded-lg border border-gray-200 text-lg transition hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-50"
                                                >
                                                    −
                                                </button>

                                                <span className="w-6 text-center font-medium">
                                                    {item.quantity}
                                                </span>

                                                <button
                                                    type="button"
                                                    onClick={() =>
                                                        increaseQuantity(product.id)
                                                    }
                                                    disabled={placingOrder}
                                                    className="flex h-9 w-9 items-center justify-center rounded-lg border border-gray-200 text-lg transition hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-50"
                                                >
                                                    +
                                                </button>

                                            </div>

                                            {/* Remove */}

                                            <button
                                                type="button"
                                                onClick={() =>
                                                    removeFromCart(product.id)
                                                }
                                                disabled={placingOrder}
                                                className="mt-3 text-sm font-medium text-red-500 transition hover:text-red-700 disabled:cursor-not-allowed disabled:opacity-50"
                                            >
                                                Remove
                                            </button>

                                        </div>

                                        {/* Item Total */}

                                        <div className="sm:text-right">

                                            <p className="text-sm text-gray-400">
                                                Item total
                                            </p>

                                            <p className="mt-1 text-lg font-semibold text-gray-900">
                                                ₹{(
                                                    product.price * item.quantity
                                                ).toLocaleString("en-IN")}
                                            </p>

                                        </div>

                                    </div>
                                )
                            })}

                        </div>

                        {/* Cart Summary */}

                        <div className="h-fit rounded-2xl border border-gray-200 bg-gray-50 p-6">

                            <p className="font-mono text-xs text-gray-400">
                                ORDER SUMMARY
                            </p>

                            <div className="mt-5 flex items-center justify-between">

                                <span className="text-sm text-gray-500">
                                    Items
                                </span>

                                <span className="font-medium">
                                    {cartItems.reduce(
                                        (total, item) =>
                                            total + item.quantity,
                                        0
                                    )}
                                </span>

                            </div>

                            <div className="mt-4 flex items-center justify-between border-t border-gray-200 pt-4">

                                <span className="font-medium text-gray-900">
                                    Total
                                </span>

                                <span className="text-xl font-bold text-gray-900">
                                    ₹{totalPrice.toLocaleString("en-IN")}
                                </span>

                            </div>

                            <button
                                type="button"
                                onClick={handlePlaceOrder}
                                disabled={placingOrder}
                                className="mt-6 w-full rounded-xl bg-black px-5 py-3 text-sm font-medium text-white transition hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-50"
                            >
                                {placingOrder
                                    ? "Placing Order..."
                                    : "Proceed to Checkout"
                                }
                            </button>

                        </div>

                    </div>

                )}

            </div>

        </main>
    )
}

export default Cart