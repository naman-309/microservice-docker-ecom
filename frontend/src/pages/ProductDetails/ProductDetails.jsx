import { useParams } from "react-router-dom"
import products from "../../data/products"
import { useCart } from "../../context/CartContext"
function ProductDetails() {

    const { id } = useParams()
    const { addToCart } = useCart()
    const product = products.find((item) => item.id === id)

    if (!product) {
        return (
            <main className="min-h-screen px-4 py-16">
                <div className="mx-auto max-w-7xl">

                    <p className="font-mono text-sm text-gray-400">
                        / product-details
                    </p>

                    <h1 className="mt-4 text-3xl font-bold text-gray-900">
                        Product not found
                    </h1>

                </div>
            </main>
        )
    }

    const isInStock = product.stock > 0

    return (
        <main className="min-h-screen px-4 py-16">

            <div className="mx-auto max-w-7xl">

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

                        <span
                            className={`w-fit rounded-full px-3 py-1 text-xs font-medium ${isInStock
                                ? "bg-green-50 text-green-600"
                                : "bg-gray-100 text-gray-500"
                                }`}
                        >
                            {isInStock ? "In Stock" : "Out of Stock"}
                        </span>

                        <h1 className="mt-5 text-4xl font-bold tracking-tight text-gray-900 md:text-5xl">
                            {product.name}
                        </h1>

                        <p className="mt-5 text-3xl font-bold text-gray-900">
                            ₹{product.price.toLocaleString("en-IN")}
                        </p>

                        <p className="mt-4 text-gray-500">
                            {isInStock
                                ? `${product.stock} items currently available.`
                                : "This product is currently unavailable."
                            }
                        </p>


                        <button
                            onClick={() => addToCart(product)}
                            disabled={!isInStock}
                            className="mt-8 w-full rounded-xl bg-black px-6 py-4 text-sm font-medium text-white transition hover:bg-gray-800 disabled:cursor-not-allowed disabled:bg-gray-200 disabled:text-gray-500 md:w-fit"
                        >
                            {isInStock ? "Add to Cart" : "Out of Stock"}
                        </button>
                    </div>

                </div>

            </div>

        </main>
    )
}

export default ProductDetails