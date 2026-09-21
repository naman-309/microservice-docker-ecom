import { useEffect, useState } from "react"

import {
    getAllProducts,
    createProduct,
    updateProduct,
    deleteProduct,
} from "../../../services/product.service"


function Products() {

    const [products, setProducts] = useState([])

    const [loading, setLoading] = useState(true)

    const [errorMessage, setErrorMessage] = useState("")

    const [successMessage, setSuccessMessage] = useState("")

    const [showForm, setShowForm] = useState(false)

    const [editingProduct, setEditingProduct] = useState(null)

    const [saving, setSaving] = useState(false)


    const [formData, setFormData] = useState({
        id: "",
        name: "",
        price: "",
        stock: "",
        imageUrl: "",
    })


    // Load products
    const loadProducts = async () => {

        try {

            setLoading(true)

            setErrorMessage("")

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


    // Initial product load
    useEffect(() => {

        loadProducts()

    }, [])


    // Handle input changes
    const handleChange = (event) => {

        const { name, value } = event.target

        setFormData((currentData) => ({
            ...currentData,
            [name]: value,
        }))
    }


    // Open Add Product form
    const handleAddProduct = () => {

        setEditingProduct(null)

        setFormData({
            id: "",
            name: "",
            price: "",
            stock: "",
            imageUrl: "",
        })

        setErrorMessage("")

        setSuccessMessage("")

        setShowForm(true)
    }


    // Open Edit Product form
    const handleEditProduct = (product) => {

        setEditingProduct(product)

        setFormData({
            id: product.id,
            name: product.name,
            price: product.price,
            stock: product.stock,
            imageUrl: product.imageUrl || "",
        })

        setErrorMessage("")

        setSuccessMessage("")

        setShowForm(true)
    }


    // Close form
    const handleCloseForm = () => {

        setShowForm(false)

        setEditingProduct(null)

        setFormData({
            id: "",
            name: "",
            price: "",
            stock: "",
            imageUrl: "",
        })
    }


    // Create / Update product
    const handleSubmit = async (event) => {

        event.preventDefault()

        setErrorMessage("")

        setSuccessMessage("")


        try {

            setSaving(true)


            if (editingProduct) {

                // UPDATE PRODUCT

                const productData = {
                    name: formData.name,
                    price: Number(formData.price),
                    stock: Number(formData.stock),
                    imageUrl: formData.imageUrl.trim() || null,
                }


                await updateProduct(
                    editingProduct.id,
                    productData
                )


                setSuccessMessage(
                    "Product updated successfully."
                )

            } else {

                // CREATE PRODUCT

                const productData = {
                    id: formData.id,
                    name: formData.name,
                    price: Number(formData.price),
                    stock: Number(formData.stock),
                    imageUrl: formData.imageUrl.trim() || null,
                }


                await createProduct(productData)


                setSuccessMessage(
                    "Product created successfully."
                )
            }


            handleCloseForm()

            await loadProducts()

        } catch (error) {

            console.error(
                "Failed to save product:",
                error
            )

            setErrorMessage(
                error.response?.data?.message ||
                "Failed to save product."
            )

        } finally {

            setSaving(false)

        }
    }


    // Delete product
    const handleDeleteProduct = async (product) => {

        const confirmed = window.confirm(
            `Are you sure you want to delete "${product.name}"?`
        )


        if (!confirmed) {
            return
        }


        try {

            setErrorMessage("")

            setSuccessMessage("")


            await deleteProduct(product.id)


            setSuccessMessage(
                "Product deleted successfully."
            )


            await loadProducts()

        } catch (error) {

            console.error(
                "Failed to delete product:",
                error
            )

            setErrorMessage(
                error.response?.data?.message ||
                "Failed to delete product."
            )
        }
    }


    return (
        <main className="min-h-screen px-4 py-16">

            <div className="mx-auto max-w-7xl">


                {/* Header */}

                <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">

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


                    {/* Add Product Button */}

                    <button
                        type="button"
                        onClick={handleAddProduct}
                        className="rounded-lg bg-black px-5 py-3 text-sm font-medium text-white transition hover:bg-gray-800"
                    >
                        + Add Product
                    </button>

                </div>


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


                {/* Add / Edit Form */}

                {showForm && (

                    <div className="mt-10 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">


                        {/* Form Header */}

                        <div className="flex items-center justify-between">

                            <div>

                                <p className="font-mono text-xs text-gray-400">
                                    {editingProduct
                                        ? "EDIT PRODUCT"
                                        : "CREATE PRODUCT"
                                    }
                                </p>


                                <h2 className="mt-2 text-2xl font-semibold text-gray-900">

                                    {editingProduct
                                        ? "Edit Product"
                                        : "Add Product"
                                    }

                                </h2>

                            </div>


                            <button
                                type="button"
                                onClick={handleCloseForm}
                                className="text-sm text-gray-500 hover:text-gray-900"
                            >
                                Cancel
                            </button>

                        </div>


                        {/* Form */}

                        <form
                            onSubmit={handleSubmit}
                            className="mt-8"
                        >

                            <div className="grid gap-6 md:grid-cols-2">


                                {/* Product ID */}

                                <div>

                                    <label
                                        htmlFor="id"
                                        className="block text-sm font-medium text-gray-700"
                                    >
                                        Product ID
                                    </label>


                                    <input
                                        id="id"
                                        name="id"
                                        type="text"
                                        value={formData.id}
                                        onChange={handleChange}
                                        disabled={Boolean(editingProduct)}
                                        required
                                        placeholder="product-101"
                                        className="mt-2 w-full rounded-lg border border-gray-300 px-4 py-3 text-sm outline-none transition focus:border-black disabled:bg-gray-100 disabled:text-gray-500"
                                    />


                                    {editingProduct && (

                                        <p className="mt-2 text-xs text-gray-400">
                                            Product ID cannot be changed.
                                        </p>

                                    )}

                                </div>


                                {/* Product Name */}

                                <div>

                                    <label
                                        htmlFor="name"
                                        className="block text-sm font-medium text-gray-700"
                                    >
                                        Product Name
                                    </label>


                                    <input
                                        id="name"
                                        name="name"
                                        type="text"
                                        value={formData.name}
                                        onChange={handleChange}
                                        required
                                        placeholder="Wireless Headphones"
                                        className="mt-2 w-full rounded-lg border border-gray-300 px-4 py-3 text-sm outline-none transition focus:border-black"
                                    />

                                </div>


                                {/* Price */}

                                <div>

                                    <label
                                        htmlFor="price"
                                        className="block text-sm font-medium text-gray-700"
                                    >
                                        Price
                                    </label>


                                    <input
                                        id="price"
                                        name="price"
                                        type="number"
                                        min="0"
                                        step="0.01"
                                        value={formData.price}
                                        onChange={handleChange}
                                        required
                                        placeholder="1499"
                                        className="mt-2 w-full rounded-lg border border-gray-300 px-4 py-3 text-sm outline-none transition focus:border-black"
                                    />

                                </div>


                                {/* Stock */}

                                <div>

                                    <label
                                        htmlFor="stock"
                                        className="block text-sm font-medium text-gray-700"
                                    >
                                        Stock
                                    </label>


                                    <input
                                        id="stock"
                                        name="stock"
                                        type="number"
                                        min="0"
                                        value={formData.stock}
                                        onChange={handleChange}
                                        required
                                        placeholder="50"
                                        className="mt-2 w-full rounded-lg border border-gray-300 px-4 py-3 text-sm outline-none transition focus:border-black"
                                    />

                                </div>


                                {/* Image URL */}

                                <div className="md:col-span-2">

                                    <label
                                        htmlFor="imageUrl"
                                        className="block text-sm font-medium text-gray-700"
                                    >
                                        Image URL
                                    </label>


                                    <input
                                        id="imageUrl"
                                        name="imageUrl"
                                        type="url"
                                        value={formData.imageUrl}
                                        onChange={handleChange}
                                        placeholder="https://example.com/product-image.jpg"
                                        className="mt-2 w-full rounded-lg border border-gray-300 px-4 py-3 text-sm outline-none transition focus:border-black"
                                    />


                                    <p className="mt-2 text-xs text-gray-400">
                                        Paste the public URL of the product image.
                                    </p>

                                </div>

                            </div>


                            {/* Buttons */}

                            <div className="mt-8 flex justify-end gap-3">

                                <button
                                    type="button"
                                    onClick={handleCloseForm}
                                    className="rounded-lg border border-gray-300 px-5 py-3 text-sm font-medium text-gray-700 hover:bg-gray-50"
                                >
                                    Cancel
                                </button>


                                <button
                                    type="submit"
                                    disabled={saving}
                                    className="rounded-lg bg-black px-5 py-3 text-sm font-medium text-white hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-50"
                                >

                                    {saving
                                        ? "Saving..."
                                        : editingProduct
                                            ? "Update Product"
                                            : "Create Product"
                                    }

                                </button>

                            </div>

                        </form>

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

                                <table className="w-full min-w-[900px]">


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
                                                Image
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


                                                {/* Product ID */}

                                                <td className="px-6 py-5 text-sm font-medium text-gray-900">
                                                    {product.id}
                                                </td>


                                                {/* Name */}

                                                <td className="px-6 py-5 text-sm text-gray-700">
                                                    {product.name}
                                                </td>


                                                {/* Price */}

                                                <td className="px-6 py-5 text-sm font-medium text-gray-900">
                                                    ₹ {product.price}
                                                </td>


                                                {/* Stock */}

                                                <td className="px-6 py-5 text-sm text-gray-600">
                                                    {product.stock}
                                                </td>


                                                {/* Image */}

                                                <td className="px-6 py-5">

                                                    {product.imageUrl ? (

                                                        <img
                                                            src={product.imageUrl}
                                                            alt={product.name}
                                                            className="h-14 w-14 rounded-lg border border-gray-200 object-cover"
                                                        />

                                                    ) : (

                                                        <span className="text-xs text-gray-400">
                                                            No image
                                                        </span>

                                                    )}

                                                </td>


                                                {/* Actions */}

                                                <td className="px-6 py-5">

                                                    <div className="flex gap-2">


                                                        {/* Edit */}

                                                        <button
                                                            type="button"
                                                            onClick={() =>
                                                                handleEditProduct(product)
                                                            }
                                                            className="rounded-lg bg-black px-4 py-2 text-xs font-medium text-white hover:bg-gray-800"
                                                        >
                                                            Edit
                                                        </button>


                                                        {/* Delete */}

                                                        <button
                                                            type="button"
                                                            onClick={() =>
                                                                handleDeleteProduct(product)
                                                            }
                                                            className="rounded-lg border border-red-300 px-4 py-2 text-xs font-medium text-red-600 hover:bg-red-50"
                                                        >
                                                            Delete
                                                        </button>

                                                    </div>

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