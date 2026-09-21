import { Routes, Route } from "react-router-dom"

import Home from "../pages/Home/Home.jsx"
import Products from "../pages/Products/Products.jsx"
import ProductDetails from "../pages/ProductDetails/ProductDetails.jsx"

import Login from "../pages/Login/Login.jsx"
import Register from "../pages/Register/Register.jsx"

import Cart from "../pages/Cart/Cart.jsx"
import Feedback from "../pages/Feedback/Feedback.jsx"

import Architecture from "../pages/Architecture/Architecture .jsx"
import Profile from "../pages/Profile/Profile.jsx"

import MyOrders from "../pages/Orders/Orders.jsx"

import Dashboard from "../pages/admin/Dashboard/Dashboard.jsx"
import Orders from "../pages/admin/Orders/Orders.jsx"
import AdminProducts from "../pages/admin/Products/Products.jsx"

function AppRoutes() {
    return (
        <Routes>

            {/* Public Pages */}
            <Route path="/" element={<Home />} />

            <Route path="/products" element={<Products />} />

            <Route
                path="/products/:id"
                element={<ProductDetails />}
            />

            <Route path="/login" element={<Login />} />

            <Route path="/register" element={<Register />} />

            <Route path="/cart" element={<Cart />} />

            <Route path="/feedback" element={<Feedback />} />

            <Route
                path="/architecture"
                element={<Architecture />}
            />

            {/* User Pages */}
            <Route
                path="/profile"
                element={<Profile />}
            />

            <Route
                path="/orders"
                element={<MyOrders />}
            />

            {/* Admin Pages */}
            <Route
                path="/admin"
                element={<Dashboard />}
            />

            <Route
                path="/admin/orders"
                element={<Orders />}
            />

            <Route
                path="/admin/products"
                element={<AdminProducts />}
            />

        </Routes>
    )
}

export default AppRoutes
