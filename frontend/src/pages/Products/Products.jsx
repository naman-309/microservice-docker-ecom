import { useState } from "react"
import products from "../../data/products"
import ProductCard from "../../components/product/ProductCard"
function Products() {

    const [searchTerm, setSearchTerm] = useState("")

    const filteredProducts = products.filter((product) =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase())
    )

    return (
        <main className="min-h-screen px-4 py-16">

            <div className="mx-auto max-w-7xl">

                {/* Page Header */}
                <div className="max-w-3xl">

                    <p className="font-mono text-sm text-gray-500">
                        / products
                    </p>

                    <h1 className="mt-3 text-4xl font-bold tracking-tight text-gray-900 md:text-5xl">
                        Explore the collection
                    </h1>

                    <p className="mt-4 text-base leading-7 text-gray-600">
                        Browse the products available on our platform.
                        Search through the collection and find what you need.
                    </p>

                </div>


                {/* Search Area */}
                <div className="mt-10 flex flex-col gap-5 rounded-2xl border border-gray-200 bg-gray-50 p-5 md:flex-row md:items-center md:justify-between">

                    {/* Search */}
                    <div className="w-full md:max-w-xl">

                        <label
                            htmlFor="product-search"
                            className="mb-2 block text-sm font-medium text-gray-700"
                        >
                            Search products
                        </label>

                        <input
                            id="product-search"
                            type="text"
                            value={searchTerm}
                            onChange={(event) => setSearchTerm(event.target.value)}
                            placeholder="Search by product name..."
                            className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm outline-none transition placeholder:text-gray-400 focus:border-gray-400 focus:ring-2 focus:ring-gray-100"
                        />

                    </div>


                    {/* Product Count */}
                    <div className="rounded-xl border border-gray-200 bg-white px-5 py-4">

                        <p className="font-mono text-xs text-gray-400">
                            RESULTS
                        </p>

                        <p className="mt-1 text-lg font-semibold text-gray-900">
                            {filteredProducts.length} products
                        </p>

                    </div>

                </div>


                {/* Temporary Result Check */}
                {/* Product Results */}
                <div className="mt-8">

                    <p className="mb-6 text-sm text-gray-500">
                        Showing {filteredProducts.length} of {products.length} products
                    </p>


                    {filteredProducts.length > 0 ? (

                        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">

                            {filteredProducts.map((product) => (
                                <ProductCard
                                    key={product.id}
                                    product={product}
                                />
                            ))}

                        </div>

                    ) : (

                        <div className="rounded-2xl border border-gray-200 bg-gray-50 px-6 py-16 text-center">

                            <p className="font-mono text-sm text-gray-400">
                                / no results
                            </p>

                            <h2 className="mt-3 text-xl font-semibold text-gray-900">
                                No products found
                            </h2>

                            <p className="mt-2 text-sm text-gray-500">
                                Try searching with a different product name.
                            </p>

                        </div>

                    )}

                </div>
            </div>

        </main>
    )
}

export default Products