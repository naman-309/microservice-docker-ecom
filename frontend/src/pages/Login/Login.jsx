import { useState } from "react"
import { Link } from "react-router-dom"
import { useAuth } from "../../context/AuthContext"

function Login() {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const [errorMessage, setErrorMessage] = useState("")
    const [successMessage, setSuccessMessage] = useState("")

    const { login } = useAuth()

    const handleSubmit = async (event) => {

        event.preventDefault()

        setErrorMessage("")
        setSuccessMessage("")

        const userData = {
            email,
            password,
        }

        try {

            const user = await login(userData)

            console.log("Login successful:", user)

            setSuccessMessage("Login successful!")

        } catch (error) {

            console.error("Login failed:", error)

            setErrorMessage(
                error.response?.data?.message ||
                "Login failed. Please check your email and password."
            )
        }
    }

    return (
        <main className="min-h-screen px-4 py-16">

            <div className="mx-auto max-w-md">

                {/* Page Header */}
                <div className="text-center">

                    <p className="font-mono text-sm text-gray-400">
                        / login
                    </p>

                    <h1 className="mt-3 text-4xl font-bold tracking-tight text-gray-900">
                        Welcome back
                    </h1>

                    <p className="mt-4 text-gray-600">
                        Login to access your account.
                    </p>

                </div>

                {/* Login Card */}
                <div className="mt-10 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">

                    {/* Success Message */}
                    {successMessage && (
                        <div className="mb-5 rounded-xl border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-700">
                            {successMessage}
                        </div>
                    )}

                    {/* Error Message */}
                    {errorMessage && (
                        <div className="mb-5 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                            {errorMessage}
                        </div>
                    )}

                    <form
                        onSubmit={handleSubmit}
                        className="space-y-5"
                    >

                        {/* Email */}
                        <div>

                            <label
                                htmlFor="email"
                                className="mb-2 block text-sm font-medium text-gray-700"
                            >
                                Email
                            </label>

                            <input
                                id="email"
                                type="email"
                                value={email}
                                onChange={(event) =>
                                    setEmail(event.target.value)
                                }
                                placeholder="Enter your email"
                                required
                                className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm outline-none transition placeholder:text-gray-400 focus:border-gray-400 focus:ring-2 focus:ring-gray-100"
                            />

                        </div>

                        {/* Password */}
                        <div>

                            <label
                                htmlFor="password"
                                className="mb-2 block text-sm font-medium text-gray-700"
                            >
                                Password
                            </label>

                            <input
                                id="password"
                                type="password"
                                value={password}
                                onChange={(event) =>
                                    setPassword(event.target.value)
                                }
                                placeholder="Enter your password"
                                required
                                className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm outline-none transition placeholder:text-gray-400 focus:border-gray-400 focus:ring-2 focus:ring-gray-100"
                            />

                        </div>

                        {/* Submit */}
                        <button
                            type="submit"
                            className="w-full rounded-xl bg-black px-4 py-3 text-sm font-medium text-white transition hover:bg-gray-800"
                        >
                            Login
                        </button>

                    </form>

                    {/* Register Link */}
                    <p className="mt-6 text-center text-sm text-gray-500">

                        Don't have an account?{" "}

                        <Link
                            to="/register"
                            className="font-medium text-gray-900 hover:underline"
                        >
                            Register
                        </Link>

                    </p>

                </div>

            </div>

        </main>
    )
}

export default Login
