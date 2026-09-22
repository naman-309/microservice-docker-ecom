import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

const products = [
    {
        id: "prod-001",
        name: "Wireless Headphones",
        price: 1499,
        stock: 50,
        imageUrl:
            "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80",
    },
    {
        id: "prod-002",
        name: "Mechanical Keyboard",
        price: 2499,
        stock: 35,
        imageUrl:
            "https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=800&q=80",
    },
    {
        id: "prod-003",
        name: "Gaming Mouse",
        price: 999,
        stock: 70,
        imageUrl:
            "https://images.unsplash.com/photo-1527814050087-3793815479db?auto=format&fit=crop&w=800&q=80",
    },
    {
        id: "prod-004",
        name: "Ultrawide Monitor",
        price: 18999,
        stock: 15,
        imageUrl:
            "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?auto=format&fit=crop&w=800&q=80",
    },
    {
        id: "prod-005",
        name: "USB-C Hub",
        price: 1299,
        stock: 60,
        imageUrl:
            "https://images.unsplash.com/photo-1625842268584-8f3296236761?auto=format&fit=crop&w=800&q=80",
    },
    {
        id: "prod-006",
        name: "Wireless Gaming Controller",
        price: 2999,
        stock: 25,
        imageUrl:
            "https://images.unsplash.com/photo-1600080972464-8e5f35f63d08?auto=format&fit=crop&w=800&q=80",
    },
    {
        id: "prod-007",
        name: "Laptop Stand",
        price: 899,
        stock: 45,
        imageUrl:
            "https://images.unsplash.com/photo-1618424181497-157f25b6ddd5?auto=format&fit=crop&w=800&q=80",
    },
    {
        id: "prod-008",
        name: "Portable Bluetooth Speaker",
        price: 1799,
        stock: 40,
        imageUrl:
            "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?auto=format&fit=crop&w=800&q=80",
    },
    {
        id: "prod-009",
        name: "Smart Watch",
        price: 3999,
        stock: 30,
        imageUrl:
            "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=800&q=80",
    },
    {
        id: "prod-010",
        name: "Wireless Earbuds",
        price: 1999,
        stock: 55,
        imageUrl:
            "https://images.unsplash.com/photo-1606220945770-b5b6c2c55bf1?auto=format&fit=crop&w=800&q=80",
    }]

const seedProducts = async () => {
    try {
        console.log("Starting product seed...")

        for (const product of products) {
            await prisma.product.upsert({
                where: {
                    id: product.id,
                },
                update: product,
                create: product,
            })
        }

        console.log("20 products seeded successfully.")
    } catch (error) {
        console.error("Failed to seed products:", error)
    } finally {
        await prisma.$disconnect()
    }
}

seedProducts()