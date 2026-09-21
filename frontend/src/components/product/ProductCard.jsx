import { Link } from "react-router-dom"

function ProductCard({ product }) {
    const isInStock = product.stock > 0

    return (
        <div className="group overflow-hidden rounded-2xl border border-gray-200 bg-white transition duration-300 hover:-translate-y-1 hover:shadow-xl">

            {/* Product Image */}
            <div className="relative aspect-square overflow-hidden bg-gray-100">

                <img
                    src={product.imageUrl}
                    alt={product.name}
                    className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                />

                {/* Stock Badge */}
                <div className="absolute left-3 top-3">
                    <span
                        className={`rounded-full px-3 py-1 text-xs font-medium ${isInStock
                                ? "bg-white text-green-600 shadow-sm"
                                : "bg-black text-white"
                            }`}
                    >
                        {isInStock ? "In Stock" : "Out of Stock"}
                    </span>
                </div>

                {/* Product ID */}
                <div className="absolute right-3 top-3">
                    <span className="rounded-full bg-black/70 px-3 py-1 font-mono text-[10px] text-white backdrop-blur-sm">
                        {product.id}
                    </span>
                </div>

            </div>

            {/* Product Information */}
            <div className="p-5">

                <p className="font-mono text-xs uppercase tracking-wider text-gray-400">
                    Developer Store
                </p>

                <h3 className="mt-2 line-clamp-1 text-lg font-semibold text-gray-900">
                    {product.name}
                </h3>

                <div className="mt-4 flex items-end justify-between">

                    <div>
                        <p className="text-xs text-gray-400">
                            Price
                        </p>

                        <p className="mt-1 text-xl font-bold text-gray-900">
                            ₹{product.price.toLocaleString("en-IN")}
                        </p>
                    </div>

                    <div className="text-right">
                        <p className="text-xs text-gray-400">
                            Stock
                        </p>

                        <p
                            className={`mt-1 text-sm font-medium ${isInStock
                                    ? "text-gray-700"
                                    : "text-red-500"
                                }`}
                        >
                            {isInStock
                                ? `${product.stock} available`
                                : "Sold out"}
                        </p>
                    </div>

                </div>

                {/* Action */}
                <Link
                    to={`/products/${product.id}`}
                    className="mt-5 block w-full rounded-xl bg-black px-4 py-3 text-center text-sm font-medium text-white transition duration-200 hover:bg-gray-800"
                >
                    View Product →
                </Link>

            </div>

        </div>
    )
}

export default ProductCard