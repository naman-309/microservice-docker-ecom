import { useState } from "react"
import { Link } from "react-router-dom"
import { registerUser } from "../../services/auth.service"

function Register() {

    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [successMessage, setSuccessMessage] = useState("")
    const [errorMessage, setErrorMessage] = useState("")
    const handleSubmit = async (event) => {
        event.preventDefault()

        setSuccessMessage("")
        setErrorMessage("")

        const userData = {
            name,
            email,
            password,
        }

        try {
            const data = await registerUser(userData)

            console.log("Register successful:", data)

            setSuccessMessage("Account created successfully!")
        } catch (error) {
            console.error("Register failed:", error)

            setErrorMessage(
                error.response?.data?.message ||
                "Registration failed. Please try again."
            )
        }
    }
    return (
        <main className="min-h-screen px-4 py-16">

            <div className="mx-auto max-w-md">

                {/* Header */}

                <div className="text-center">

                    <p className="font-mono text-sm text-gray-400">
                        / register
                    </p>

                    <h1 className="mt-3 text-4xl font-bold tracking-tight text-gray-900">
                        Create your account
                    </h1>

                    <p className="mt-3 text-sm leading-6 text-gray-500">
                        Create an account to start using the platform.
                    </p>

                </div>


                {/* Register Form */}

                <form
                    onSubmit={handleSubmit}
                    className="mt-10 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm sm:p-8"
                >

                    {/* Name */}

                    <div>

                        <label
                            htmlFor="name"
                            className="mb-2 block text-sm font-medium text-gray-700"
                        >
                            Name
                        </label>
                        {successMessage && (
                            <div className="mb-5 rounded-xl border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-700">
                                {successMessage}
                            </div>
                        )}

                        {errorMessage && (
                            <div className="mb-5 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                                {errorMessage}
                            </div>
                        )}

                        <input
                            id="name"
                            type="text"
                            value={name}
                            onChange={(event) =>
                                setName(event.target.value)
                            }
                            placeholder="Your name"
                            className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none transition placeholder:text-gray-400 focus:border-gray-400 focus:ring-2 focus:ring-gray-100"
                            required
                        />

                    </div>


                    {/* Email */}

                    <div className="mt-5">

                        <label
                            htmlFor="register-email"
                            className="mb-2 block text-sm font-medium text-gray-700"
                        >
                            Email
                        </label>

                        <input
                            id="register-email"
                            type="email"
                            value={email}
                            onChange={(event) =>
                                setEmail(event.target.value)
                            }
                            placeholder="you@example.com"
                            className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none transition placeholder:text-gray-400 focus:border-gray-400 focus:ring-2 focus:ring-gray-100"
                            required
                        />

                    </div>


                    {/* Password */}

                    <div className="mt-5">

                        <label
                            htmlFor="register-password"
                            className="mb-2 block text-sm font-medium text-gray-700"
                        >
                            Password
                        </label>

                        <input
                            id="register-password"
                            type="password"
                            value={password}
                            onChange={(event) =>
                                setPassword(event.target.value)
                            }
                            placeholder="Create a password"
                            className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none transition placeholder:text-gray-400 focus:border-gray-400 focus:ring-2 focus:ring-gray-100"
                            required
                        />

                    </div>


                    {/* Confirm Password */}

                    <div className="mt-5">

                        <label
                            htmlFor="confirm-password"
                            className="mb-2 block text-sm font-medium text-gray-700"
                        >
                            Confirm Password
                        </label>

                        <input
                            id="confirm-password"
                            type="password"
                            value={confirmPassword}
                            onChange={(event) =>
                                setConfirmPassword(event.target.value)
                            }
                            placeholder="Repeat your password"
                            className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none transition placeholder:text-gray-400 focus:border-gray-400 focus:ring-2 focus:ring-gray-100"
                            required
                        />

                    </div>


                    {/* Submit */}

                    <button
                        type="submit"
                        className="mt-7 w-full rounded-xl bg-black px-5 py-3.5 text-sm font-medium text-white transition hover:bg-gray-800"
                    >
                        Create Account
                    </button>


                    {/* Login */}

                    <p className="mt-6 text-center text-sm text-gray-500">

                        Already have an account?{" "}

                        <Link
                            to="/login"
                            className="font-medium text-gray-900 hover:underline"
                        >
                            Login
                        </Link>

                    </p>

                </form>

            </div>

        </main>
    )
}

export default Register
