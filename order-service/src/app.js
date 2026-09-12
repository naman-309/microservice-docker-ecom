import express from 'express';
import cookieParser from 'cookie-parser'; // 1. Added cookie-parser import
import errorMiddleware from './middleware/error.middleware.js';
import authRoutes from './modules/auth/auth.routes.js';
import orderRoutes from "./modules/order/order.routes.js";
const app = express();

app.use(express.json());
app.use(cookieParser()); // 2. Added cookie-parser middleware

// Auth routes 
app.use('/api/auth', authRoutes);

//order routes
app.use("/api/orders", orderRoutes);

// Test route 
app.get('/', (req, res) => {
    res.json({ message: 'Order Service is running' });
});

app.use(errorMiddleware);

export default app;
