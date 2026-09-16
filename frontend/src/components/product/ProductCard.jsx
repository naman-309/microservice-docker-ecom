
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
                        className={`rounded - full px - 3 py - 1 text - xs font - medium ${isInStock
                                ? "bg-white text-green-600"
                                : "bg-black text-white"
                            } `}
                    >
                        {isInStock ? "In Stock" : "Out of Stock"}
                    </span>
                </div>

            </div>

            {/* Product Information */}
            <div className="p-5">

                <h3 className="line-clamp-1 text-lg font-semibold">
                    {product.name}
                </h3>

                <div className="mt-3 flex items-center justify-between">

                    <p className="text-xl font-bold">
                        ₹{product.price.toLocaleString("en-IN")}
                    </p>

                    <span className="text-sm text-gray-400">
                        {product.stock} left
                    </span>

                </div>

                {/* Action */}
                <button
                    disabled={!isInStock}
                    className="mt-5 w-full rounded-xl bg-black px-4 py-3 text-sm font-medium text-white transition hover:bg-gray-800 disabled:cursor-not-allowed disabled:bg-gray-200 disabled:text-gray-500"
                >
                    View Product
                </button>

            </div>

        </div>
    )
}

export default ProductCard
