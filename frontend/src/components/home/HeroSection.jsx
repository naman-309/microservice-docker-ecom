function HeroSection() {
    return (
        <section className="relative overflow-hidden px-4 py-20 md:py-28">

            {/* Background Glow */}
            <div className="absolute left-1/2 top-0 -z-10 h-72 w-72 -translate-x-1/2 rounded-full bg-blue-500/10 blur-3xl"></div>

            <div className="mx-auto grid max-w-7xl items-center gap-12 md:grid-cols-2">

                {/* Left Content */}
                <div>

                    {/* Small Badge */}
                    <div className="mb-6 inline-flex items-center rounded-full border border-gray-200 bg-gray-50 px-4 py-2 text-sm text-gray-600">
                        <span className="mr-2 h-2 w-2 rounded-full bg-green-500"></span>
                        Built with Microservices
                    </div>

                    {/* Main Heading */}
                    <h1 className="max-w-3xl text-5xl font-bold leading-tight tracking-tight md:text-7xl">
                        Build.
                        <br />
                        Ship.
                        <br />
                        <span className="text-gray-400">
                            Scale.
                        </span>
                    </h1>

                    {/* Description */}
                    <p className="mt-6 max-w-xl text-lg leading-8 text-gray-600">
                        A modern e-commerce platform built with
                        microservices, event-driven architecture,
                        Redis, PostgreSQL and Docker.
                    </p>

                    {/* Buttons */}
                    <div className="mt-8 flex flex-wrap gap-4">

                        <button className="rounded-xl bg-black px-6 py-3 font-medium text-white transition hover:bg-gray-800">
                            Explore Products →
                        </button>

                        <button className="rounded-xl border border-gray-300 px-6 py-3 font-medium transition hover:bg-gray-100">
                            View Architecture
                        </button>

                    </div>

                    {/* Developer Text */}
                    <div className="mt-8 text-sm text-gray-400">
                        <span className="font-mono">
                            dev@nkkr
                        </span>
                        <span className="mx-2">•</span>
                        React + Node + PostgreSQL
                    </div>

                </div>


                {/* Right Visual */}
                <div className="relative">

                    {/* Main Card */}
                    <div className="rounded-3xl border border-gray-200 bg-gray-50 p-6 shadow-2xl">

                        <div className="mb-6 flex items-center justify-between">

                            <div>
                                <p className="text-sm text-gray-500">
                                    System Status
                                </p>

                                <h2 className="mt-1 text-xl font-semibold">
                                    All Services Online
                                </h2>
                            </div>

                            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-100">
                                <span className="h-3 w-3 rounded-full bg-green-500"></span>
                            </div>

                        </div>


                        {/* Service Cards */}
                        <div className="space-y-3">

                            <div className="flex items-center justify-between rounded-xl border border-gray-200 bg-white p-4">
                                <span className="font-medium">
                                    Product Service
                                </span>

                                <span className="text-sm text-green-600">
                                    ● Online
                                </span>
                            </div>

                            <div className="flex items-center justify-between rounded-xl border border-gray-200 bg-white p-4">
                                <span className="font-medium">
                                    Order Service
                                </span>

                                <span className="text-sm text-green-600">
                                    ● Online
                                </span>
                            </div>

                            <div className="flex items-center justify-between rounded-xl border border-gray-200 bg-white p-4">
                                <span className="font-medium">
                                    Redis Events
                                </span>

                                <span className="text-sm text-green-600">
                                    ● Active
                                </span>
                            </div>

                            <div className="flex items-center justify-between rounded-xl border border-gray-200 bg-white p-4">
                                <span className="font-medium">
                                    API Gateway
                                </span>

                                <span className="text-sm text-green-600">
                                    ● Running
                                </span>
                            </div>

                        </div>


                        {/* Bottom Code */}
                        <div className="mt-6 rounded-xl bg-black p-4 font-mono text-sm text-gray-300">

                            <p>
                                <span className="text-gray-500">
                                    $
                                </span>
                                npm run production
                            </p>

                            <p className="mt-2 text-green-400">
                                ✓ Services connected successfully
                            </p>

                        </div>

                    </div>

                </div>

            </div>

        </section>
    )
}

export default HeroSection