
```md
# Order Service

Order Service is responsible for authentication, users, orders, order status and order-related events.

## Tech Stack

- Node.js
- Express.js
- Prisma ORM
- PostgreSQL (Neon)
- Redis (Upstash)
- Redis Pub/Sub
- JWT
- bcrypt
- Nodemailer
- Axios
- JavaScript ES Modules

---

# Project Structure

```text
order-service/
│
├── prisma/
│   └── schema.prisma
│
├── src/
│   ├── config/
│   │   ├── db.js
│   │   ├── redis.js
│   │   └── mail.js
│   │
│   ├── middleware/
│   │   ├── auth.middleware.js
│   │   ├── authorize.middleware.js
│   │   └── error.middleware.js
│   │
│   ├── modules/
│   │   ├── auth/
│   │   │   ├── auth.controller.js
│   │   │   ├── auth.service.js
│   │   │   └── auth.routes.js
│   │   │
│   │   └── order/
│   │       ├── order.controller.js
│   │       ├── order.service.js
│   │       └── order.routes.js
│   │
│   ├── events/
│   │   ├── order.events.js
│   │   └── order.email.js
│   │
│   ├── app.js
│   └── server.js
│
├── .env
├── .gitignore
├── package.json
└── package-lock.json