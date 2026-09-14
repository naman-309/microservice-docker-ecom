# Product Service

Product Service is responsible for managing products and product stock in our E-Commerce Microservices project.

## Tech Stack

- Node.js
- Express.js
- Prisma ORM
- PostgreSQL (Neon)
- Redis (Upstash)
- Redis Pub/Sub
- JavaScript ES Modules

---

# Project Structure

```text
product-service/
│
├── prisma/
│   └── schema.prisma
│
├── src/
│   ├── config/
│   │   ├── db.js
│   │   └── redis.js
│   │
│   ├── middleware/
│   │   └── error.middleware.js
│   │
│   ├── modules/
│   │   └── product/
│   │       ├── product.controller.js
│   │       ├── product.routes.js
│   │       └── product.service.js
│   │
│   ├── events/
│   │   └── order.events.js
│   │
│   ├── app.js
│   └── server.js
│
├── .env
├── .gitignore
├── package.json
└── package-lock.json

