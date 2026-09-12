
import prisma from "../../config/db.js";
import { redisClient } from "../../config/redis.js";

// Create Product
const createProduct = async (productData) => {
    const product = await prisma.product.create({
        data: productData,
    });

    // Delete old products cache
    const deleted = await redisClient.del("products");

    console.log("Products cache deleted:", deleted);

    return product;
};

// Get All Products
const getAllProducts = async () => {
    // Check Redis
    const cachedProducts = await redisClient.get("products");

    // Redis HIT
    if (cachedProducts) {
        console.log("Products found in Redis");

        return JSON.parse(cachedProducts);
    }

    // Redis MISS
    console.log("Products not found in Redis. Getting from database");

    const products = await prisma.product.findMany({
        orderBy: {
            createdAt: "desc",
        },
    });

    // Save fresh products in Redis
    await redisClient.set(
        "products",
        JSON.stringify(products),
        {
            EX: 60, // Set expiration time (in seconds)
        }
    );

    console.log("Products saved in Redis");

    return products;
};
// Get Product By ID
const getProductById = async (id) => {
    // 1. Create a separate Redis key for this product
    const cacheKey = `product:${id}`;

    // 2. Check Redis
    const cachedProduct = await redisClient.get(cacheKey);

    // 3. If product is found in Redis
    if (cachedProduct) {
        console.log("Product found in Redis");

        return JSON.parse(cachedProduct);
    }

    // 4. If product is not in Redis, get it from database
    console.log("Product not found in Redis. Getting from database");

    const product = await prisma.product.findUnique({
        where: {
            id: id,
        },
    });

    // 5. If product does not exist
    if (!product) {
        return null;
    }

    // 6. Save product in Redis
    await redisClient.set(
        cacheKey,
        JSON.stringify(product)
    );

    console.log("Product saved in Redis");

    return product;
};

// Update Product
const updateProduct = async (id, productData) => {
    // 1. Check if product exists
    const existingProduct = await prisma.product.findUnique({
        where: {
            id: id,
        },
    });

    if (!existingProduct) {
        return null;
    }

    // 2. Update product in database
    const updatedProduct = await prisma.product.update({
        where: {
            id: id,
        },
        data: productData,
    });

    // 3. Delete single product cache
    await redisClient.del(`product:${id}`);

    // 4. Delete all products cache
    await redisClient.del("products");

    console.log("Product caches deleted");

    return updatedProduct;
};

// Delete Product
const deleteProduct = async (id) => {
    // 1. Check if product exists
    const existingProduct = await prisma.product.findUnique({
        where: {
            id: id,
        },
    });

    if (!existingProduct) {
        return null;
    }

    // 2. Delete product from database
    const deletedProduct = await prisma.product.delete({
        where: {
            id: id,
        },
    });

    // 3. Delete single product cache
    await redisClient.del(`product:${id}`);

    // 4. Delete all products cache
    await redisClient.del("products");

    console.log("Product caches deleted");

    return deletedProduct;
};
const reduceProductStock = async (productId, quantity) => {
    const product = await prisma.product.findUnique({
        where: {
            id: productId,
        },
    });

    if (!product) {
        console.log(`Product not found: ${productId}`);
        return;
    }

    if (product.stock < quantity) {
        console.log(`Not enough stock for: ${product.name}`);
        return;
    }

    const updatedProduct = await prisma.product.update({
        where: {
            id: productId,
        },
        data: {
            stock: product.stock - quantity,
        },
    });

    await redisClient.del(`product:${productId}`);
    await redisClient.del("products");

    console.log(
        `Stock reduced: ${product.name} | New stock: ${updatedProduct.stock}`
    );
};
export {
    createProduct,
    getAllProducts,
    getProductById, updateProduct, deleteProduct, reduceProductStock
};
