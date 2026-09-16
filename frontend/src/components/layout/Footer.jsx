import { Link } from "react-router-dom"

function Footer() {
    return (
        <footer className="border-t border-gray-200 bg-gray-50">

            <div className="mx-auto max-w-7xl px-4 py-16">

                {/* Main Footer */}
                <div className="grid gap-12 md:grid-cols-[1.5fr_1fr_1fr_1fr]">

                    {/* Brand */}
                    <div>

                        <h2 className="text-xl font-bold text-gray-900">
                            dev@nkkr
                        </h2>

                        <p className="mt-4 max-w-sm text-sm leading-6 text-gray-500">
                            A modern e-commerce platform built to explore
                            microservices, event-driven architecture and
                            scalable web development.
                        </p>

                        <div className="mt-5 inline-flex rounded-lg border border-gray-200 bg-white px-3 py-2 font-mono text-xs text-gray-500">
                            React + Node + PostgreSQL
                        </div>

                    </div>


                    {/* Explore */}
                    <div>

                        <h3 className="text-sm font-semibold text-gray-900">
                            Explore
                        </h3>

                        <div className="mt-4 flex flex-col gap-3 text-sm text-gray-500">

                            <Link
                                to="/"
                                className="transition hover:text-black"
                            >
                                Home
                            </Link>

                            <Link
                                to="/products"
                                className="transition hover:text-black"
                            >
                                Products
                            </Link>

                            <Link
                                to="/cart"
                                className="transition hover:text-black"
                            >
                                Cart
                            </Link>

                            <Link
                                to="/feedback"
                                className="transition hover:text-black"
                            >
                                Feedback
                            </Link>

                        </div>

                    </div>


                    {/* Project */}
                    <div>

                        <h3 className="text-sm font-semibold text-gray-900">
                            Project
                        </h3>

                        <div className="mt-4 flex flex-col gap-3 text-sm text-gray-500">

                            <Link
                                to="/architecture"
                                className="transition hover:text-black"
                            >
                                Architecture
                            </Link>

                            <span>
                                Technology
                            </span>

                            <span>
                                Microservices
                            </span>

                            <span>
                                Event-driven system
                            </span>

                        </div>

                    </div>


                    {/* Developer */}
                    <div>

                        <h3 className="text-sm font-semibold text-gray-900">
                            Developer
                        </h3>

                        <div className="mt-4 flex flex-col gap-3 text-sm text-gray-500">

                            <span>
                                GitHub
                            </span>

                            <span>
                                LinkedIn
                            </span>

                            <span>
                                Contact
                            </span>

                            <span>
                                Built with curiosity.
                            </span>

                        </div>

                    </div>

                </div>


                {/* Bottom */}
                <div className="mt-14 flex flex-col gap-4 border-t border-gray-200 pt-6 text-sm text-gray-400 sm:flex-row sm:items-center sm:justify-between">

                    <p>
                        © 2026 dev@nkkr. All rights reserved.
                    </p>

                    <p className="font-mono">
                        / built with React + Node + Redis
                    </p>

                </div>

            </div>

        </footer>
    )
}

export default Footer