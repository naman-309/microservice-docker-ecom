import {
    createProduct,
    getAllProducts,
    getProductById,
    updateProduct,
    deleteProduct,
} from "./product.service.js";
// Create Product
const createProductController = async (req, res, next) => {
    try {
        const product = await createProduct(req.body);

        res.status(201).json({
            success: true,
            message: "Product created successfully",
            data: product,
        });
    } catch (error) {
        next(error);
    }
};

// Get All Products
const getAllProductsController = async (req, res, next) => {
    try {
        const products = await getAllProducts();

        res.status(200).json({
            success: true,
            data: products,
        });
    } catch (error) {
        next(error);
    }
};

// Get Product By ID
// Get Product By ID
const getProductByIdController = async (req, res, next) => {
    try {
        const product = await getProductById(req.params.id);

        if (!product) {
            return res.status(404).json({
                success: false,
                message: "Product not found",
            });
        }

        res.status(200).json({
            success: true,
            data: product,
        });
    } catch (error) {
        next(error);
    }
};

// Update Product
const updateProductController = async (req, res, next) => {
    try {
        const product = await updateProduct(
            req.params.id,
            req.body
        );

        if (!product) {
            return res.status(404).json({
                success: false,
                message: "Product not found",
            });
        }

        res.status(200).json({
            success: true,
            message: "Product updated successfully",
            data: product,
        });
    } catch (error) {
        next(error);
    }
};
// Delete Product
const deleteProductController = async (req, res, next) => {
    try {
        const product = await deleteProduct(req.params.id);

        if (!product) {
            return res.status(404).json({
                success: false,
                message: "Product not found",
            });
        }

        res.status(200).json({
            success: true,
            message: "Product deleted successfully",
            data: product,
        });
    } catch (error) {
        next(error);
    }
};
export {
    createProductController,
    getAllProductsController,
    getProductByIdController, updateProductController, deleteProductController
};