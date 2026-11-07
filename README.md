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
