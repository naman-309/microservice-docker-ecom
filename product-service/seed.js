import prisma from "./src/config/db.js";

const products = [
    {
        id: "prod-002",
        name: "Linen Shirt",
        price: 799,
        stock: 25,
    },
    {
        id: "prod-003",
        name: "Cotton Shirt",
        price: 699,
        stock: 30,
    },
    {
        id: "prod-004",
        name: "Denim Shirt",
        price: 999,
        stock: 18,
    },
    {
        id: "prod-005",
        name: "Oversized T-Shirt",
        price: 599,
        stock: 40,
    },
    {
        id: "prod-006",
        name: "Polo T-Shirt",
        price: 749,
        stock: 22,
    },
    {
        id: "prod-007",
        name: "Cargo Pant",
        price: 1199,
        stock: 15,
    },
    {
        id: "prod-008",
        name: "Linen Pant",
        price: 899,
        stock: 20,
    },
    {
        id: "prod-009",
        name: "Regular Fit Jeans",
        price: 1299,
        stock: 17,
    },
    {
        id: "prod-010",
        name: "Slim Fit Jeans",
        price: 1399,
        stock: 12,
    },
    {
        id: "prod-011",
        name: "Casual Shorts",
        price: 599,
        stock: 28,
    },
    {
        id: "prod-012",
        name: "Formal Shirt",
        price: 899,
        stock: 16,
    },
    {
        id: "prod-013",
        name: "Printed Shirt",
        price: 799,
        stock: 24,
    },
    {
        id: "prod-014",
        name: "Plain T-Shirt",
        price: 499,
        stock: 45,
    },
    {
        id: "prod-015",
        name: "Hoodie",
        price: 1499,
        stock: 10,
    },
    {
        id: "prod-016",
        name: "Sweatshirt",
        price: 1299,
        stock: 14,
    },
    {
        id: "prod-017",
        name: "Track Pant",
        price: 899,
        stock: 21,
    },
    {
        id: "prod-018",
        name: "Chino Pant",
        price: 1099,
        stock: 19,
    },
    {
        id: "prod-019",
        name: "Denim Jacket",
        price: 1799,
        stock: 8,
    },
    {
        id: "prod-020",
        name: "Casual Blazer",
        price: 2299,
        stock: 7,
    },
    {
        id: "prod-021",
        name: "Summer Shirt",
        price: 749,
        stock: 32,
    },
    {
        id: "prod-022",
        name: "trendy Shirt",
        price: 749,
        stock: 32,
    }
];

const seedProducts = async () => {
    try {
        await prisma.product.createMany({
            data: products,
            skipDuplicates: true,
        });

        console.log("20 products added successfully");
    } catch (error) {
        console.error("Error adding products:", error);
    } finally {
        await prisma.$disconnect();
    }
};

seedProducts();