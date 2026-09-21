import { useEffect, useState } from "react"

import ProductCard from "../../components/product/ProductCard"
import { getAllProducts } from "../../services/product.service"

function Products() {
    const [products, setProducts] = useState([])
    const [searchTerm, setSearchTerm] = useState("")
    const [loading, setLoading] = useState(true)
    const [errorMessage, setErrorMessage] = useState("")

    // Load products from API
    useEffect(() => {
        const loadProducts = async () => {
            try {
                setLoading(true)
                setErrorMessage("")

                const data = await getAllProducts()

                console.log("Customer products:", data.data)

                setProducts(data.data)
            } catch (error) {
                console.error(
                    "Failed to fetch products:",
                    error
                )

                setErrorMessage(
                    error.response?.data?.message ||
                    "Failed to load products."
                )
            } finally {
                setLoading(false)
            }
        }

        loadProducts()
    }, [])

    // Search products
    const filteredProducts = products.filter((product) =>
        product.name
            .toLowerCase()
            .includes(searchTerm.toLowerCase())
    )

    return (
        <main className="min-h-screen bg-white px-4 py-12 sm:px-6 lg:px-8 lg:py-16">

            <div className="mx-auto max-w-7xl">

                {/* Page Header */}
                <section className="relative overflow-hidden rounded-3xl border border-gray-200 bg-gray-50 px-6 py-12 sm:px-10 lg:px-14">

                    {/* Decorative Background */}
                    <div className="pointer-events-none absolute -right-20 -top-20 h-56 w-56 rounded-full bg-gray-200 blur-3xl" />

                    <div className="relative max-w-3xl">

                        <p className="font-mono text-xs uppercase tracking-[0.2em] text-gray-400">
                            / store / products
                        </p>

                        <h1 className="mt-4 text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl lg:text-6xl">
                            Build your setup.
                        </h1>

                        <p className="mt-5 max-w-2xl text-base leading-7 text-gray-600 sm:text-lg">
                            Explore our collection of carefully selected
                            tech products built for developers, creators,
                            gamers, and modern workspaces.
                        </p>

                        <div className="mt-8 flex flex-wrap gap-3">

                            <div className="rounded-full border border-gray-200 bg-white px-4 py-2 text-xs font-medium text-gray-600">
                                Developer focused
                            </div>

                            <div className="rounded-full border border-gray-200 bg-white px-4 py-2 text-xs font-medium text-gray-600">
                                Modern hardware
                            </div>

                            <div className="rounded-full border border-gray-200 bg-white px-4 py-2 text-xs font-medium text-gray-600">
                                Fast delivery
                            </div>

                        </div>

                    </div>

                </section>

                {/* Search Section */}
                <section className="mt-10">

                    <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">

                        {/* Search */}
                        <div className="w-full lg:max-w-2xl">

                            <label
                                htmlFor="product-search"
                                className="mb-2 block text-sm font-medium text-gray-700"
                            >
                                Search products
                            </label>

                            <div className="relative">

                                <input
                                    id="product-search"
                                    type="text"
                                    value={searchTerm}
                                    onChange={(event) =>
                                        setSearchTerm(event.target.value)
                                    }
                                    placeholder="Search headphones, keyboards, monitors..."
                                    className="w-full rounded-2xl border border-gray-200 bg-white px-5 py-4 pr-12 text-sm outline-none transition placeholder:text-gray-400 focus:border-gray-400 focus:ring-4 focus:ring-gray-100"
                                />

                                <span className="pointer-events-none absolute right-5 top-1/2 -translate-y-1/2 text-gray-400">
                                    /
                                </span>

                            </div>

                        </div>

                        {/* Results */}
                        <div className="flex items-center justify-between rounded-2xl border border-gray-200 bg-gray-50 px-5 py-4 lg:min-w-[220px]">

                            <div>
                                <p className="font-mono text-[10px] uppercase tracking-widest text-gray-400">
                                    Results
                                </p>

                                <p className="mt-1 text-lg font-semibold text-gray-900">
                                    {loading
                                        ? "..."
                                        : filteredProducts.length
                                    }
                                </p>
                            </div>

                            <div className="text-right">

                                <p className="font-mono text-[10px] uppercase tracking-widest text-gray-400">
                                    Total
                                </p>

                                <p className="mt-1 text-lg font-semibold text-gray-900">
                                    {loading
                                        ? "..."
                                        : products.length
                                    }
                                </p>

                            </div>

                        </div>

                    </div>

                </section>

                {/* Products Section */}
                <section className="mt-10">

                    {/* Loading */}
                    {loading && (
                        <div className="rounded-3xl border border-gray-200 bg-gray-50 px-6 py-20 text-center">

                            <div className="mx-auto h-8 w-8 animate-spin rounded-full border-2 border-gray-200 border-t-black" />

                            <p className="mt-5 font-mono text-xs uppercase tracking-widest text-gray-400">
                                Loading products
                            </p>

                            <h2 className="mt-2 text-xl font-semibold text-gray-900">
                                Getting the latest collection...
                            </h2>

                        </div>
                    )}

                    {/* Error */}
                    {!loading && errorMessage && (
                        <div className="rounded-3xl border border-red-200 bg-red-50 px-6 py-20 text-center">

                            <p className="font-mono text-xs uppercase tracking-widest text-red-400">
                                / error
                            </p>

                            <h2 className="mt-3 text-2xl font-semibold text-gray-900">
                                Something went wrong
                            </h2>

                            <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-red-600">
                                {errorMessage}
                            </p>

                        </div>
                    )}

                    {/* Products */}
                    {!loading && !errorMessage && (
                        <>

                            {/* Result Information */}
                            <div className="mb-6 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">

                                <p className="text-sm text-gray-500">
                                    {searchTerm ? (
                                        <>
                                            Showing{" "}
                                            <span className="font-medium text-gray-900">
                                                {filteredProducts.length}
                                            </span>{" "}
                                            results for{" "}
                                            <span className="font-medium text-gray-900">
                                                "{searchTerm}"
                                            </span>
                                        </>
                                    ) : (
                                        <>
                                            Showing all{" "}
                                            <span className="font-medium text-gray-900">
                                                {products.length}
                                            </span>{" "}
                                            products
                                        </>
                                    )}
                                </p>

                                {searchTerm && (
                                    <button
                                        type="button"
                                        onClick={() => setSearchTerm("")}
                                        className="w-fit text-sm font-medium text-gray-500 transition hover:text-black"
                                    >
                                        Clear search →
                                    </button>
                                )}

                            </div>

                            {/* Product Grid */}
                            {filteredProducts.length > 0 ? (
                                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">

                                    {filteredProducts.map((product) => (
                                        <ProductCard
                                            key={product.id}
                                            product={product}
                                        />
                                    ))}

                                </div>
                            ) : (
                                /* Empty Search State */
                                <div className="rounded-3xl border border-gray-200 bg-gray-50 px-6 py-20 text-center">

                                    <p className="font-mono text-xs uppercase tracking-widest text-gray-400">
                                        / no results
                                    </p>

                                    <h2 className="mt-3 text-2xl font-semibold text-gray-900">
                                        Nothing matched your search
                                    </h2>

                                    <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-gray-500">
                                        Try searching with another product
                                        name or clear the search to see
                                        the complete collection.
                                    </p>

                                    <button
                                        type="button"
                                        onClick={() => setSearchTerm("")}
                                        className="mt-6 rounded-xl bg-black px-5 py-3 text-sm font-medium text-white transition hover:bg-gray-800"
                                    >
                                        Show all products
                                    </button>

                                </div>
                            )}

                        </>
                    )}

                </section>

            </div>

        </main>
    )
}

export default Products