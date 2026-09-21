import { useState } from "react"
import { Link } from "react-router-dom"
import { useCart } from "../../context/CartContext"
import { useAuth } from "../../context/AuthContext"

function Navbar() {

    const [isMenuOpen, setIsMenuOpen] = useState(false)

    const { cartItems } = useCart()

    const cartCount = cartItems.reduce(
        (total, item) => total + item.quantity,
        0
    )

    const { user, logout } = useAuth()

    return (
        <nav className="border-b border-gray-200 bg-white">

            <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4">

                {/* Logo */}
                <div>
                    <h1 className="text-xl font-bold">
                        dev@nkkr
                    </h1>
                </div>

                {/* Desktop Navigation */}
                <div className="hidden items-center gap-6 md:flex">

                    <Link
                        to="/"
                        className="text-sm text-gray-700 hover:text-black"
                    >
                        Home
                    </Link>

                    <Link
                        to="/products"
                        className="text-sm text-gray-700 hover:text-black"
                    >
                        Products
                    </Link>

                    <Link
                        to="/feedback"
                        className="text-sm text-gray-700 hover:text-black"
                    >
                        Feedback
                    </Link>

                    <Link
                        to="/architecture"
                        className="text-sm text-gray-700 hover:text-black"
                    >
                        Architecture
                    </Link>
                    {user?.role === "admin" && (
                        <Link
                            to="/admin"
                            className="text-sm font-medium text-gray-900 hover:text-gray-500"
                        >
                            Admin
                        </Link>
                    )}
                </div>

                {/* Desktop Right Side */}
                <div className="hidden items-center gap-3 md:flex">

                    {user ? (
                        <>
                            <Link
                                to="/profile"
                                className="rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-50"
                            >
                                Profile
                            </Link>

                            <button
                                onClick={logout}
                                className="rounded-lg bg-black px-4 py-2 text-sm font-medium text-white transition hover:bg-gray-800"
                            >
                                Logout
                            </button>
                        </>
                    ) : (
                        <>
                            <Link
                                to="/login"
                                className="rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-50"
                            >
                                Login
                            </Link>

                            <Link
                                to="/register"
                                className="rounded-lg bg-black px-4 py-2 text-sm font-medium text-white transition hover:bg-gray-800"
                            >
                                Register
                            </Link>
                        </>
                    )}

                    <Link
                        to="/cart"
                        className="rounded-lg bg-black px-4 py-2 text-sm text-white hover:bg-gray-800"
                    >
                        Cart {cartCount > 0 && `(${cartCount})`}
                    </Link>

                </div>

                {/* Mobile Menu Button */}
                <button
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                    className="text-2xl md:hidden"
                >
                    ☰
                </button>

            </div>

            {/* Mobile Navigation */}
            {isMenuOpen && (
                <div className="border-t border-gray-200 px-4 py-4 md:hidden">

                    <div className="flex flex-col gap-4">

                        <Link
                            to="/"
                            onClick={() => setIsMenuOpen(false)}
                        >
                            Home
                        </Link>

                        <Link
                            to="/products"
                            onClick={() => setIsMenuOpen(false)}
                        >
                            Products
                        </Link>

                        <Link
                            to="/feedback"
                            onClick={() => setIsMenuOpen(false)}
                        >
                            Feedback
                        </Link>

                        <Link
                            to="/architecture"
                            onClick={() => setIsMenuOpen(false)}
                        >
                            Architecture
                        </Link>
                        {user?.role === "admin" && (
                            <Link
                                to="/admin"
                                onClick={() => setIsMenuOpen(false)}
                                className="font-medium"
                            >
                                Admin
                            </Link>
                        )}
                        {user ? (
                            <>
                                <Link
                                    to="/profile"
                                    onClick={() => setIsMenuOpen(false)}
                                >
                                    Profile
                                </Link>

                                <button
                                    className="text-left"
                                    onClick={() => {
                                        logout()
                                        setIsMenuOpen(false)
                                    }}
                                >
                                    Logout
                                </button>
                            </>
                        ) : (
                            <>
                                <Link
                                    to="/login"
                                    onClick={() => setIsMenuOpen(false)}
                                >
                                    Login
                                </Link>

                                <Link
                                    to="/register"
                                    onClick={() => setIsMenuOpen(false)}
                                >
                                    Register
                                </Link>
                            </>
                        )}

                        <Link
                            to="/cart"
                            onClick={() => setIsMenuOpen(false)}
                        >
                            Cart {cartCount > 0 && `(${cartCount})`}
                        </Link>

                    </div>

                </div>
            )}

        </nav>
    )
}

export default Navbar
