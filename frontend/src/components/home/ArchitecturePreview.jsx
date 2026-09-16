function ArchitecturePreview() {
    return (
        <section className="border-t border-gray-100 px-4 py-20">

            <div className="mx-auto max-w-7xl">

                {/* Section Header */}
                <div className="max-w-3xl">

                    <p className="font-mono text-sm text-gray-500">
                        / architecture
                    </p>

                    <h2 className="mt-3 text-3xl font-bold tracking-tight text-gray-900 md:text-4xl">
                        How the system works
                    </h2>

                    <p className="mt-4 max-w-2xl text-base leading-7 text-gray-600">
                        A closer look at how requests travel through the platform,
                        how services communicate, where data lives, and how
                        event-driven workflows keep the system connected.
                    </p>

                </div>


                {/* Architecture Area */}
                <div className="relative mt-12 overflow-hidden rounded-3xl border border-gray-200 bg-gray-50 p-6 md:p-10">

                    {/* Decorative Background */}
                    <div className="pointer-events-none absolute -right-24 -top-24 h-64 w-64 rounded-full bg-blue-500/5 blur-3xl"></div>

                    <div className="pointer-events-none absolute -bottom-24 -left-24 h-64 w-64 rounded-full bg-purple-500/5 blur-3xl"></div>


                    {/* Architecture Header */}
                    <div className="relative text-center">

                        <div className="inline-flex items-center gap-2 rounded-full border border-gray-200 bg-white px-3 py-1.5">

                            <span className="h-2 w-2 rounded-full bg-green-500"></span>

                            <span className="font-mono text-xs text-gray-500">
                                SYSTEM OVERVIEW
                            </span>

                        </div>

                        <h3 className="mt-5 text-2xl font-semibold tracking-tight text-gray-900 md:text-3xl">
                            Request → Services → Data → Events
                        </h3>

                        <p className="mx-auto mt-3 max-w-xl text-sm leading-6 text-gray-500">
                            Each layer has a focused responsibility, allowing
                            the platform to remain modular and easier to scale.
                        </p>

                    </div>


                    {/* Architecture Flow */}
                    <div className="relative mt-12">

                        {/* ================= CLIENT ================= */}

                        <div className="flex justify-center">

                            <div className="group w-full max-w-sm rounded-2xl border border-gray-200 bg-white p-6 text-center shadow-sm transition duration-300 hover:-translate-y-1 hover:border-gray-300 hover:shadow-lg">

                                <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-xl bg-gray-900 font-mono text-sm text-white">
                                    01
                                </div>

                                <p className="mt-4 font-mono text-[10px] uppercase tracking-widest text-gray-400">
                                    Client
                                </p>

                                <h4 className="mt-2 text-xl font-semibold text-gray-900">
                                    React Frontend
                                </h4>

                                <p className="mt-2 text-sm leading-6 text-gray-500">
                                    User interface, navigation and application
                                    requests.
                                </p>

                            </div>

                        </div>


                        {/* Connector */}
                        <div className="flex flex-col items-center py-4">

                            <div className="h-8 w-px bg-gray-300"></div>

                            <span className="text-[10px] text-gray-400">
                                HTTP
                            </span>

                        </div>


                        {/* ================= GATEWAY ================= */}

                        <div className="flex justify-center">

                            <div className="group w-full max-w-sm rounded-2xl border border-gray-200 bg-white p-6 text-center shadow-sm transition duration-300 hover:-translate-y-1 hover:border-gray-300 hover:shadow-lg">

                                <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-xl bg-gray-100 font-mono text-sm font-semibold text-gray-900">
                                    02
                                </div>

                                <p className="mt-4 font-mono text-[10px] uppercase tracking-widest text-gray-400">
                                    Gateway
                                </p>

                                <h4 className="mt-2 text-xl font-semibold text-gray-900">
                                    Nginx API Gateway
                                </h4>

                                <p className="mt-2 text-sm leading-6 text-gray-500">
                                    Receives incoming requests and routes them
                                    to the appropriate backend service.
                                </p>

                                <div className="mt-4 inline-flex rounded-lg bg-gray-50 px-3 py-1.5 font-mono text-xs text-gray-500">
                                    :80 / :8080
                                </div>

                            </div>

                        </div>


                        {/* Connector */}
                        <div className="flex flex-col items-center py-4">

                            <div className="h-8 w-px bg-gray-300"></div>

                            <span className="text-[10px] text-gray-400">
                                ROUTING
                            </span>

                        </div>


                        {/* ================= SERVICES ================= */}

                        <div>

                            <div className="mb-4 text-center">

                                <p className="font-mono text-[10px] uppercase tracking-widest text-gray-400">
                                    03 / Independent Services
                                </p>

                            </div>


                            <div className="grid gap-5 md:grid-cols-2">

                                {/* Product Service */}
                                <div className="group rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-gray-300 hover:shadow-lg">

                                    <div className="flex items-start justify-between">

                                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gray-100 font-mono text-sm font-semibold text-gray-900">
                                            P
                                        </div>

                                        <span className="rounded-full bg-green-50 px-3 py-1 font-mono text-[10px] text-green-600">
                                            :4001
                                        </span>

                                    </div>

                                    <p className="mt-5 font-mono text-[10px] uppercase tracking-widest text-gray-400">
                                        Service
                                    </p>

                                    <h4 className="mt-2 text-xl font-semibold text-gray-900">
                                        Product Service
                                    </h4>

                                    <p className="mt-2 text-sm leading-6 text-gray-500">
                                        Manages products, pricing, inventory
                                        and product-related operations.
                                    </p>

                                    <div className="mt-5 flex flex-wrap gap-2">

                                        <span className="rounded-lg bg-gray-50 px-3 py-1.5 text-xs text-gray-600">
                                            Products
                                        </span>

                                        <span className="rounded-lg bg-gray-50 px-3 py-1.5 text-xs text-gray-600">
                                            Stock
                                        </span>

                                        <span className="rounded-lg bg-gray-50 px-3 py-1.5 text-xs text-gray-600">
                                            Cache
                                        </span>

                                    </div>

                                </div>


                                {/* Order Service */}
                                <div className="group rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-gray-300 hover:shadow-lg">

                                    <div className="flex items-start justify-between">

                                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gray-900 font-mono text-sm font-semibold text-white">
                                            O
                                        </div>

                                        <span className="rounded-full bg-green-50 px-3 py-1 font-mono text-[10px] text-green-600">
                                            :4002
                                        </span>

                                    </div>

                                    <p className="mt-5 font-mono text-[10px] uppercase tracking-widest text-gray-400">
                                        Service
                                    </p>

                                    <h4 className="mt-2 text-xl font-semibold text-gray-900">
                                        Order Service
                                    </h4>

                                    <p className="mt-2 text-sm leading-6 text-gray-500">
                                        Handles authentication, users, order
                                        creation and order processing.
                                    </p>

                                    <div className="mt-5 flex flex-wrap gap-2">

                                        <span className="rounded-lg bg-gray-50 px-3 py-1.5 text-xs text-gray-600">
                                            Auth
                                        </span>

                                        <span className="rounded-lg bg-gray-50 px-3 py-1.5 text-xs text-gray-600">
                                            Orders
                                        </span>

                                        <span className="rounded-lg bg-gray-50 px-3 py-1.5 text-xs text-gray-600">
                                            Events
                                        </span>

                                    </div>

                                </div>

                            </div>

                        </div>


                        {/* Connector */}
                        <div className="flex flex-col items-center py-5">

                            <div className="h-8 w-px bg-gray-300"></div>

                            <span className="text-[10px] text-gray-400">
                                PERSISTENCE
                            </span>

                        </div>


                        {/* ================= DATA LAYER ================= */}

                        <div>

                            <div className="mb-4 text-center">

                                <p className="font-mono text-[10px] uppercase tracking-widest text-gray-400">
                                    04 / Data Layer
                                </p>

                            </div>


                            <div className="grid gap-5 md:grid-cols-2">

                                {/* Product Database */}
                                <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">

                                    <div className="flex items-center justify-between">

                                        <span className="font-mono text-xs text-gray-400">
                                            PRODUCT DB
                                        </span>

                                        <span className="rounded-full bg-blue-50 px-3 py-1 text-[10px] text-blue-600">
                                            PostgreSQL
                                        </span>

                                    </div>

                                    <h4 className="mt-4 text-lg font-semibold text-gray-900">
                                        Product Database
                                    </h4>

                                    <p className="mt-2 text-sm leading-6 text-gray-500">
                                        Dedicated Neon PostgreSQL database
                                        for product and inventory data.
                                    </p>

                                    <div className="mt-5 border-t border-gray-100 pt-4">

                                        <p className="font-mono text-[10px] uppercase tracking-widest text-gray-400">
                                            Cache
                                        </p>

                                        <p className="mt-2 text-sm font-medium text-gray-800">
                                            Upstash Redis
                                        </p>

                                        <p className="mt-1 text-xs leading-5 text-gray-500">
                                            Frequently requested product data
                                            can be served from cache.
                                        </p>

                                    </div>

                                </div>


                                {/* Order Database */}
                                <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">

                                    <div className="flex items-center justify-between">

                                        <span className="font-mono text-xs text-gray-400">
                                            ORDER DB
                                        </span>

                                        <span className="rounded-full bg-purple-50 px-3 py-1 text-[10px] text-purple-600">
                                            PostgreSQL
                                        </span>

                                    </div>

                                    <h4 className="mt-4 text-lg font-semibold text-gray-900">
                                        Order Database
                                    </h4>

                                    <p className="mt-2 text-sm leading-6 text-gray-500">
                                        Dedicated Neon PostgreSQL database
                                        for users and order information.
                                    </p>

                                    <div className="mt-5 border-t border-gray-100 pt-4">

                                        <p className="font-mono text-[10px] uppercase tracking-widest text-gray-400">
                                            Events
                                        </p>

                                        <p className="mt-2 text-sm font-medium text-gray-800">
                                            Redis Pub/Sub
                                        </p>

                                        <p className="mt-1 text-xs leading-5 text-gray-500">
                                            Publishes events so other parts of
                                            the system can react independently.
                                        </p>

                                    </div>

                                </div>

                            </div>

                        </div>


                        {/* ================= EVENT FLOW ================= */}

                        <div className="mt-8">

                            <div className="mb-4 text-center">

                                <p className="font-mono text-[10px] uppercase tracking-widest text-gray-400">
                                    05 / Event Driven Flow
                                </p>

                            </div>


                            <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm md:p-8">

                                <div className="grid gap-8 lg:grid-cols-[1fr_auto_1.5fr] lg:items-center">

                                    {/* Event */}
                                    <div>

                                        <span className="inline-flex rounded-lg bg-gray-900 px-3 py-1.5 font-mono text-xs text-white">
                                            order.created
                                        </span>

                                        <h4 className="mt-4 text-xl font-semibold text-gray-900">
                                            One event, multiple reactions
                                        </h4>

                                        <p className="mt-2 text-sm leading-6 text-gray-500">
                                            Once an order is created, the Order
                                            Service publishes an event through
                                            Redis Pub/Sub.
                                        </p>

                                    </div>


                                    {/* Arrow */}
                                    <div className="hidden text-2xl text-gray-300 lg:block">
                                        →
                                    </div>


                                    {/* Reactions */}
                                    <div className="grid gap-3 sm:grid-cols-2">

                                        {/* Stock */}
                                        <div className="rounded-xl border border-gray-200 bg-gray-50 p-5">

                                            <div className="flex items-center justify-between">

                                                <span className="font-mono text-[10px] uppercase tracking-widest text-gray-400">
                                                    Consumer 01
                                                </span>

                                                <span className="text-green-500">
                                                    ●
                                                </span>

                                            </div>

                                            <h5 className="mt-3 font-semibold text-gray-900">
                                                Stock Update
                                            </h5>

                                            <p className="mt-1 text-xs leading-5 text-gray-500">
                                                Product service consumes the
                                                event and reduces stock.
                                            </p>

                                        </div>


                                        {/* Email */}
                                        <div className="rounded-xl border border-gray-200 bg-gray-50 p-5">

                                            <div className="flex items-center justify-between">

                                                <span className="font-mono text-[10px] uppercase tracking-widest text-gray-400">
                                                    Consumer 02
                                                </span>

                                                <span className="text-green-500">
                                                    ●
                                                </span>

                                            </div>

                                            <h5 className="mt-3 font-semibold text-gray-900">
                                                Email Confirmation
                                            </h5>

                                            <p className="mt-1 text-xs leading-5 text-gray-500">
                                                Order confirmation is sent to
                                                the customer asynchronously.
                                            </p>

                                        </div>

                                    </div>

                                </div>

                            </div>

                        </div>


                        {/* Bottom Architecture Summary */}
                        <div className="mt-8 grid gap-3 sm:grid-cols-3">

                            <div className="rounded-xl border border-gray-200 bg-white px-5 py-4">

                                <p className="font-mono text-[10px] text-gray-400">
                                    SERVICES
                                </p>

                                <p className="mt-1 text-sm font-semibold text-gray-900">
                                    Independently structured
                                </p>

                            </div>


                            <div className="rounded-xl border border-gray-200 bg-white px-5 py-4">

                                <p className="font-mono text-[10px] text-gray-400">
                                    DATA
                                </p>

                                <p className="mt-1 text-sm font-semibold text-gray-900">
                                    Database per service
                                </p>

                            </div>


                            <div className="rounded-xl border border-gray-200 bg-white px-5 py-4">

                                <p className="font-mono text-[10px] text-gray-400">
                                    EVENTS
                                </p>

                                <p className="mt-1 text-sm font-semibold text-gray-900">
                                    Redis Pub/Sub
                                </p>

                            </div>

                        </div>


                        {/* Explore Button */}
                        <div className="mt-10 flex flex-col items-center justify-between gap-4 border-t border-gray-200 pt-8 sm:flex-row">

                            <div>

                                <p className="font-medium text-gray-900">
                                    Want to see the complete architecture?
                                </p>

                                <p className="mt-1 text-sm text-gray-500">
                                    Explore the services, request flow and
                                    infrastructure in detail.
                                </p>

                            </div>

                            <button className="rounded-xl bg-black px-5 py-3 text-sm font-medium text-white transition hover:bg-gray-800">
                                Explore Full Architecture →
                            </button>

                        </div>

                    </div>

                </div>

            </div>

        </section>
    )
}

export default ArchitecturePreview