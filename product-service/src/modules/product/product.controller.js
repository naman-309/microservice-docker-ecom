import {
    createProduct,
    getAllProducts, getProductById
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
export {
    createProductController,
    getAllProductsController,
    getProductByIdController
};