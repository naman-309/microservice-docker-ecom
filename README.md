# 🛒 E-Commerce Microservices Platform

A production-grade, distributed e-commerce backend built with a **microservices architecture** using **Node.js, Express, PostgreSQL, Prisma ORM, Redis**, and containerized end-to-end with **Docker & Docker Compose**.

---

## 🏗️ Architecture Overview

The platform decouples core e-commerce domains into independent, containerized services to ensure fault isolation, independent scalability, and high performance.

```text
                        ┌───────────────────────────────┐
                        │      API Gateway / Client     │
                        └──────────────┬────────────────┘
                                       │
            ┌──────────────────────────┼──────────────────────────┐
            ▼                          ▼                          ▼
   ┌─────────────────┐        ┌─────────────────┐        ┌─────────────────┐
   │   Auth Service  │        │ Product Service │        │  Order Service  │
   │  (JWT, Bcrypt)  │        │ (Catalog, SKU)  │        │ (Cart, Checkout)│
   └────────┬────────┘        └────────┬────────┘        └────────┬────────┘
            │                          │                          │
            │                          ▼                          │
            │                  ┌───────────────┐                  │
            │                  │  Redis Cache  │                  │
            │                  └───────────────┘                  │
            ▼                          ▼                          ▼
   ┌───────────────────────────────────────────────────────────────────────┐
   │                    PostgreSQL (Prisma ORM Managed)                    │
   └───────────────────────────────────────────────────────────────────────┘
##📁 Repository Structure 

microservice-docker-ecom/
├── auth-service/           # User authentication, JWT issuance, roles
│   ├── src/
│   ├── prisma/
│   ├── Dockerfile
│   └── package.json
├── product-service/        # Product catalog, categories, inventory, caching
│   ├── src/
│   ├── prisma/
│   ├── Dockerfile
│   └── package.json
├── order-service/          # Orders, checkout lifecycle, billing
│   ├── src/
│   ├── prisma/
│   ├── Dockerfile
│   └── package.json
├── docker-compose.yml      # Orchestrates all services, databases, and Redis
├── .env.example            # Root environment template
└── README.md

^^
## 🚀 Key Features 

Microservices Isolation: Autonomous services with separate concerns (Auth, Products, Orders).

Fast In-Memory Caching: Redis caching layer for hot product reads and sub-millisecond responses.

Type-Safe Persistence: PostgreSQL schema migrations and queries managed via Prisma ORM.

One-Command Setup: Complete multi-container environment orchestrated via docker-compose.

Stateless Auth: Role-based access control with secure JWT bearer authentication  


# Database
POSTGRES_USER=postgres
POSTGRES_PASSWORD=postgres_password
POSTGRES_DB=ecom_db
DATABASE_URL=postgresql://postgres:postgres_password@postgres:5432/ecom_db?schema=public

# Redis
REDIS_HOST=redis
REDIS_PORT=6379

# Service Ports
AUTH_PORT=5001
PRODUCT_PORT=5002
ORDER_PORT=5003

# Security
JWT_SECRET=your_super_secret_jwt_key
JWT_EXPIRES_IN=1d
