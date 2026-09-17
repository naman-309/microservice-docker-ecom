import { Routes, Route } from "react-router-dom"
import Home from "../pages/Home/Home.jsx"
import Products from "../pages/Products/Products.jsx"
import Login from "../pages/Login/Login.jsx"
import Register from "../pages/Register/Register.jsx"
import Cart from "../pages/Cart/Cart.jsx"
import Feedback from "../pages/Feedback/Feedback.jsx"
import Architecture from "../pages/Architecture/Architecture .jsx"
import ProductDetails from "../pages/ProductDetails/ProductDetails"
function AppRoutes() {
    return (
        <Routes>

            <Route path="/" element={<Home />} />

            <Route
                path="/products"
                element={<Products />}
            />

            <Route
                path="/login"
                element={<Login />}
            />

            <Route
                path="/register"
                element={<Register />}
            />

            <Route
                path="/feedback"
                element={<Feedback />}
            />

            <Route
                path="/architecture"
                element={<Architecture />}
            />

            <Route
                path="/cart"
                element={<Cart />}
            />
            <Route
                path="/products/:id"
                element={<ProductDetails />}
            />
        </Routes>
    )
}

export default AppRoutes