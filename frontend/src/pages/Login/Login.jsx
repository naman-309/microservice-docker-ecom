import { useState } from "react"
import { Link } from "react-router-dom"

function Login() {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const handleSubmit = (event) => {
        event.preventDefault()

        console.log("Email:", email)
        console.log("Password:", password)
    }

    return (
        <main className="min-h-screen px-4 py-16">

            <div className="mx-auto flex max-w-md flex-col justify-center">

                {/* Header */}

                <div className="text-center">

                    <p className="font-mono text-sm text-gray-400">
                        / login
                    </p>

                    <h1 className="mt-3 text-4xl font-bold tracking-tight text-gray-900">
                        Welcome back
                    </h1>

                    <p className="mt-3 text-sm leading-6 text-gray-500">
                        Sign in to continue to your account.
                    </p>

                </div>


                {/* Login Form */}

                <form
                    onSubmit={handleSubmit}
                    className="mt-10 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm sm:p-8"
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
                            placeholder="you@example.com"
                            className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none transition placeholder:text-gray-400 focus:border-gray-400 focus:ring-2 focus:ring-gray-100"
                            required
                        />
                    </div>


                    {/* Password */}

                    <div className="mt-5">

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
                            className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none transition placeholder:text-gray-400 focus:border-gray-400 focus:ring-2 focus:ring-gray-100"
                            required
                        />

                    </div>


                    {/* Submit */}

                    <button
                        type="submit"
                        className="mt-7 w-full rounded-xl bg-black px-5 py-3.5 text-sm font-medium text-white transition hover:bg-gray-800"
                    >
                        Login
                    </button>


                    {/* Register */}

                    <p className="mt-6 text-center text-sm text-gray-500">

                        Don't have an account?{" "}

                        <Link
                            to="/register"
                            className="font-medium text-gray-900 hover:underline"
                        >
                            Register
                        </Link>

                    </p>

                </form>

            </div>

        </main>
    )
}

export default Login
