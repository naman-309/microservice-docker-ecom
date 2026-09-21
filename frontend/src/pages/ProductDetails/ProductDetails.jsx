import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"

import { useCart } from "../../context/CartContext"
import { getProductById } from "../../services/product.service"

function ProductDetails() {
    const { id } = useParams()
    const { addToCart } = useCart()

    const [product, setProduct] = useState(null)
    const [loading, setLoading] = useState(true)
    const [errorMessage, setErrorMessage] = useState("")

    // Load product from API
    useEffect(() => {
        const loadProduct = async () => {
            try {
                setLoading(true)
                setErrorMessage("")
                setProduct(null)

                const data = await getProductById(id)

                console.log("Product details:", data.data)

                setProduct(data.data)
            } catch (error) {
                console.error(
                    "Failed to fetch product:",
                    error
                )

                setErrorMessage(
                    error.response?.data?.message ||
                    "Failed to load product."
                )
            } finally {
                setLoading(false)
            }
        }

        loadProduct()
    }, [id])

    // Loading State
    if (loading) {
        return (
            <main className="min-h-screen px-4 py-16">
                <div className="mx-auto max-w-7xl">

                    <p className="font-mono text-sm text-gray-400">
                        / product-details
                    </p>

                    <div className="mt-8 rounded-3xl border border-gray-200 bg-gray-50 px-6 py-20 text-center">

                        <div className="mx-auto h-8 w-8 animate-spin rounded-full border-2 border-gray-200 border-t-black" />

                        <p className="mt-5 font-mono text-xs uppercase tracking-widest text-gray-400">
                            Loading product
                        </p>

                        <h1 className="mt-2 text-xl font-semibold text-gray-900">
                            Getting product details...
                        </h1>

                    </div>

                </div>
            </main>
        )
    }

    // Error / Product Not Found
    if (errorMessage || !product) {
        return (
            <main className="min-h-screen px-4 py-16">
                <div className="mx-auto max-w-7xl">

                    <p className="font-mono text-sm text-gray-400">
                        / product-details
                    </p>

                    <div className="mt-8 rounded-3xl border border-red-200 bg-red-50 px-6 py-20 text-center">

                        <p className="font-mono text-xs uppercase tracking-widest text-red-400">
                            / error
                        </p>

                        <h1 className="mt-3 text-3xl font-bold text-gray-900">
                            Product not found
                        </h1>

                        <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-red-600">
                            {errorMessage ||
                                "The product you are looking for does not exist."}
                        </p>

                    </div>

                </div>
            </main>
        )
    }

    const isInStock = product.stock > 0

    return (
        <main className="min-h-screen px-4 py-16">

            <div className="mx-auto max-w-7xl">

                {/* Breadcrumb */}
                <p className="font-mono text-sm text-gray-400">
                    / products / {product.id}
                </p>

                <div className="mt-8 grid gap-10 md:grid-cols-2">

                    {/* Product Image */}
                    <div className="overflow-hidden rounded-3xl border border-gray-200 bg-gray-100">

                        <img
                            src={product.imageUrl}
                            alt={product.name}
                            className="h-full max-h-[600px] w-full object-cover"
                        />

                    </div>

                    {/* Product Information */}
                    <div className="flex flex-col justify-center">

                        {/* Stock Badge */}
                        <span
                            className={`w-fit rounded-full px-3 py-1 text-xs font-medium ${isInStock
                                    ? "bg-green-50 text-green-600"
                                    : "bg-gray-100 text-gray-500"
                                }`}
                        >
                            {isInStock
                                ? "In Stock"
                                : "Out of Stock"}
                        </span>

                        {/* Product Name */}
                        <h1 className="mt-5 text-4xl font-bold tracking-tight text-gray-900 md:text-5xl">
                            {product.name}
                        </h1>

                        {/* Price */}
                        <p className="mt-5 text-3xl font-bold text-gray-900">
                            ₹{product.price.toLocaleString("en-IN")}
                        </p>

                        {/* Stock Information */}
                        <p className="mt-4 text-gray-500">
                            {isInStock
                                ? `${product.stock} items currently available.`
                                : "This product is currently unavailable."
                            }
                        </p>

                        {/* Product ID */}
                        <p className="mt-3 font-mono text-xs text-gray-400">
                            Product ID: {product.id}
                        </p>

                        {/* Add To Cart */}
                        <button
                            type="button"
                            onClick={() => addToCart(product)}
                            disabled={!isInStock}
                            className="mt-8 w-full rounded-xl bg-black px-6 py-4 text-sm font-medium text-white transition hover:bg-gray-800 disabled:cursor-not-allowed disabled:bg-gray-200 disabled:text-gray-500 md:w-fit"
                        >
                            {isInStock
                                ? "Add to Cart"
                                : "Out of Stock"}
                        </button>

                    </div>

                </div>

            </div>

        </main>
    )
}

export default ProductDetails