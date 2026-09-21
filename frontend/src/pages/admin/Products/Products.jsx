import { useEffect, useState } from "react"
import { getAllProducts } from "../../../services/product.service"

function Products() {

    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState(true)
    const [errorMessage, setErrorMessage] = useState("")

    useEffect(() => {

        const loadProducts = async () => {

            try {

                const data = await getAllProducts()

                console.log("Admin products:", data.data)

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

    return (
        <main className="min-h-screen px-4 py-16">

            <div className="mx-auto max-w-7xl">

                {/* Header */}
                <div>

                    <p className="font-mono text-sm text-gray-400">
                        / admin / products
                    </p>

                    <h1 className="mt-3 text-4xl font-bold tracking-tight text-gray-900">
                        Products
                    </h1>

                    <p className="mt-4 text-gray-600">
                        View and manage products in the store.
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
                            Loading products...
                        </p>
                    </div>
                )}

                {/* Empty */}
                {!loading &&
                    !errorMessage &&
                    products.length === 0 && (
                        <div className="mt-10 rounded-2xl border border-gray-200 bg-white p-10 text-center">

                            <p className="text-lg font-medium text-gray-900">
                                No products found
                            </p>

                            <p className="mt-2 text-sm text-gray-500">
                                There are currently no products.
                            </p>

                        </div>
                    )}

                {/* Products Table */}
                {!loading &&
                    !errorMessage &&
                    products.length > 0 && (
                        <div className="mt-10 overflow-hidden rounded-2xl border border-gray-200 bg-white">

                            <div className="overflow-x-auto">

                                <table className="w-full min-w-[800px]">

                                    <thead className="border-b border-gray-200 bg-gray-50">

                                        <tr>

                                            <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
                                                Product ID
                                            </th>

                                            <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
                                                Name
                                            </th>

                                            <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
                                                Price
                                            </th>

                                            <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
                                                Stock
                                            </th>

                                            <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
                                                Action
                                            </th>

                                        </tr>

                                    </thead>

                                    <tbody>

                                        {products.map((product) => (

                                            <tr
                                                key={product.id}
                                                className="border-b border-gray-100"
                                            >

                                                <td className="px-6 py-5 text-sm font-medium text-gray-900">
                                                    {product.id}
                                                </td>

                                                <td className="px-6 py-5 text-sm text-gray-700">
                                                    {product.name}
                                                </td>

                                                <td className="px-6 py-5 text-sm font-medium text-gray-900">
                                                    ₹ {product.price}
                                                </td>

                                                <td className="px-6 py-5 text-sm text-gray-600">
                                                    {product.stock}
                                                </td>

                                                <td className="px-6 py-5">

                                                    <button
                                                        type="button"
                                                        className="rounded-lg bg-black px-4 py-2 text-xs font-medium text-white hover:bg-gray-800"
                                                    >
                                                        Edit
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

export default Products