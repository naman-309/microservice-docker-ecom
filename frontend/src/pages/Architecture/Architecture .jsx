function Architecture() {
    return (
        <main className="min-h-screen bg-white text-gray-900">

            {/* ================= HERO ================= */}

            <section className="border-b border-gray-100 px-4 py-20 md:py-28">

                <div className="mx-auto max-w-6xl">

                    <p className="font-mono text-sm text-gray-500">
                        / architecture
                    </p>

                    <div className="mt-6 max-w-4xl">

                        <h1 className="text-4xl font-bold tracking-tight md:text-6xl">
                            Behind the Build
                        </h1>

                        <p className="mt-6 max-w-3xl text-lg leading-8 text-gray-600">
                            A closer look at how this e-commerce platform is
                            structured, how requests move through the system,
                            how services communicate, and how data and events
                            are handled.
                        </p>

                    </div>


                    {/* Tech badges */}

                    <div className="mt-8 flex flex-wrap gap-2">

                        {[
                            "React",
                            "Node.js",
                            "Express",
                            "PostgreSQL",
                            "Prisma",
                            "Redis",
                            "Docker",
                            "Nginx",
                            "AWS EC2",
                        ].map((tech) => (
                            <span
                                key={tech}
                                className="rounded-full border border-gray-200 bg-gray-50 px-4 py-2 font-mono text-xs text-gray-600"
                            >
                                {tech}
                            </span>
                        ))}

                    </div>

                </div>

            </section>


            {/* ================= HIGH LEVEL ================= */}

            <section className="px-4 py-20">

                <div className="mx-auto max-w-6xl">

                    <div className="max-w-3xl">

                        <p className="font-mono text-xs uppercase tracking-widest text-gray-400">
                            01 / High Level Architecture
                        </p>

                        <h2 className="mt-3 text-3xl font-bold tracking-tight md:text-4xl">
                            How the pieces connect
                        </h2>

                        <p className="mt-4 leading-7 text-gray-600">
                            The platform is divided into focused services.
                            The frontend communicates with the backend through
                            an Nginx API gateway, while each service owns its
                            own database.
                        </p>

                    </div>


                    {/* Architecture Diagram */}

                    <div className="mt-10 overflow-hidden rounded-3xl border border-gray-200 bg-gray-50 p-6 md:p-10">

                        <div className="flex flex-col items-center">

                            {/* React */}

                            <ArchitectureBox
                                number="01"
                                label="CLIENT"
                                title="React Frontend"
                                description="User interface, navigation, authentication and API requests."
                            />


                            <ArchitectureArrow label="HTTP" />


                            {/* Nginx */}

                            <ArchitectureBox
                                number="02"
                                label="GATEWAY"
                                title="Nginx API Gateway"
                                description="Routes incoming requests to the correct backend service."
                                badge=":80"
                            />


                            <ArchitectureArrow label="ROUTING" />


                            {/* Services */}

                            <div className="w-full max-w-4xl">

                                <p className="mb-5 text-center font-mono text-xs uppercase tracking-widest text-gray-400">
                                    Backend Services
                                </p>

                                <div className="grid gap-5 md:grid-cols-2">

                                    <ServiceBox
                                        letter="P"
                                        title="Product Service"
                                        port=":4001"
                                        description="Products, pricing, inventory and product operations."
                                    />

                                    <ServiceBox
                                        letter="O"
                                        title="Order Service"
                                        port=":4002"
                                        description="Authentication, users, orders and order processing."
                                    />

                                </div>

                            </div>


                            <ArchitectureArrow label="DATA + EVENTS" />


                            {/* Data */}

                            <div className="w-full max-w-4xl">

                                <div className="grid gap-5 md:grid-cols-2">

                                    <DataBox
                                        title="Product Database"
                                        type="Neon PostgreSQL"
                                        description="Dedicated database for product and inventory data."
                                    />

                                    <DataBox
                                        title="Order Database"
                                        type="Neon PostgreSQL"
                                        description="Dedicated database for users and order information."
                                    />

                                </div>

                            </div>


                            {/* Redis */}

                            <div className="mt-8 w-full max-w-2xl">

                                <div className="rounded-2xl border border-gray-200 bg-white p-6 text-center shadow-sm">

                                    <p className="font-mono text-xs uppercase tracking-widest text-gray-400">
                                        Shared Infrastructure
                                    </p>

                                    <h3 className="mt-3 text-xl font-semibold">
                                        Upstash Redis
                                    </h3>

                                    <p className="mt-2 text-sm leading-6 text-gray-500">
                                        Used for caching and Redis Pub/Sub
                                        event communication.
                                    </p>

                                </div>

                            </div>

                        </div>

                    </div>

                </div>

            </section>


            {/* ================= REQUEST FLOW ================= */}

            <section className="border-t border-gray-100 bg-gray-50 px-4 py-20">

                <div className="mx-auto max-w-6xl">

                    <div className="max-w-3xl">

                        <p className="font-mono text-xs uppercase tracking-widest text-gray-400">
                            02 / Request Flow
                        </p>

                        <h2 className="mt-3 text-3xl font-bold tracking-tight md:text-4xl">
                            What happens when a request is made?
                        </h2>

                        <p className="mt-4 leading-7 text-gray-600">
                            Every request follows a predictable path through
                            the system instead of directly accessing individual
                            services from the frontend.
                        </p>

                    </div>


                    <div className="mt-10 space-y-4">

                        <FlowStep
                            number="01"
                            title="React sends the request"
                            description="The frontend sends an HTTP request to the Nginx API gateway."
                        />

                        <FlowStep
                            number="02"
                            title="Nginx routes the request"
                            description="The gateway checks the API path and forwards the request to the correct service."
                        />

                        <FlowStep
                            number="03"
                            title="Backend service handles it"
                            description="Product Service or Order Service processes the business logic."
                        />

                        <FlowStep
                            number="04"
                            title="Database is accessed"
                            description="The service communicates with its own Neon PostgreSQL database."
                        />

                        <FlowStep
                            number="05"
                            title="Response returns to React"
                            description="The service sends the response back through Nginx to the frontend."
                        />

                    </div>

                </div>

            </section>


            {/* ================= MICROSERVICES ================= */}

            <section className="px-4 py-20">

                <div className="mx-auto max-w-6xl">

                    <p className="font-mono text-xs uppercase tracking-widest text-gray-400">
                        03 / Microservices
                    </p>

                    <h2 className="mt-3 text-3xl font-bold tracking-tight md:text-4xl">
                        Each service has a focused responsibility
                    </h2>


                    <div className="mt-10 grid gap-6 md:grid-cols-2">

                        <DetailedService
                            title="Product Service"
                            port="4001"
                            items={[
                                "Product CRUD",
                                "Product pricing",
                                "Inventory management",
                                "Product cache",
                                "Stock updates",
                            ]}
                        />

                        <DetailedService
                            title="Order Service"
                            port="4002"
                            items={[
                                "User authentication",
                                "Registration and login",
                                "Order creation",
                                "Order management",
                                "Order status",
                                "Admin authorization",
                            ]}
                        />

                    </div>

                </div>

            </section>


            {/* ================= DATABASE ================= */}

            <section className="border-t border-gray-100 bg-gray-50 px-4 py-20">

                <div className="mx-auto max-w-6xl">

                    <p className="font-mono text-xs uppercase tracking-widest text-gray-400">
                        04 / Database Architecture
                    </p>

                    <h2 className="mt-3 text-3xl font-bold tracking-tight md:text-4xl">
                        Database per service
                    </h2>

                    <p className="mt-4 max-w-3xl leading-7 text-gray-600">
                        Each backend service owns its database. This keeps
                        service boundaries clear and prevents one service from
                        directly depending on another service's database.
                    </p>


                    <div className="mt-10 grid gap-6 md:grid-cols-2">

                        <DatabaseCard
                            title="Product Database"
                            database="Neon PostgreSQL"
                            owner="Product Service"
                            data="Products, prices and inventory"
                        />

                        <DatabaseCard
                            title="Order Database"
                            database="Neon PostgreSQL"
                            owner="Order Service"
                            data="Users and orders"
                        />

                    </div>

                </div>

            </section>


            {/* ================= REDIS ================= */}

            <section className="px-4 py-20">

                <div className="mx-auto max-w-6xl">

                    <p className="font-mono text-xs uppercase tracking-widest text-gray-400">
                        05 / Redis
                    </p>

                    <h2 className="mt-3 text-3xl font-bold tracking-tight md:text-4xl">
                        Cache + communication
                    </h2>

                    <p className="mt-4 max-w-3xl leading-7 text-gray-600">
                        Upstash Redis has two important responsibilities in
                        the system: caching frequently requested data and
                        communicating events between services.
                    </p>


                    <div className="mt-10 grid gap-6 md:grid-cols-2">

                        <InfoCard
                            number="01"
                            title="Caching"
                            description="Frequently requested product and order data can be served from Redis instead of querying PostgreSQL every time."
                        />

                        <InfoCard
                            number="02"
                            title="Pub/Sub"
                            description="Services publish and consume events without directly depending on each other's internal implementation."
                        />

                    </div>

                </div>

            </section>


            {/* ================= EVENT FLOW ================= */}

            <section className="border-t border-gray-100 bg-gray-50 px-4 py-20">

                <div className="mx-auto max-w-6xl">

                    <p className="font-mono text-xs uppercase tracking-widest text-gray-400">
                        06 / Event Driven Flow
                    </p>

                    <h2 className="mt-3 text-3xl font-bold tracking-tight md:text-4xl">
                        One order, multiple reactions
                    </h2>

                    <p className="mt-4 max-w-3xl leading-7 text-gray-600">
                        Order creation triggers an event. Other parts of the
                        system can react to that event independently.
                    </p>


                    {/* Event */}

                    <div className="mt-10 rounded-3xl border border-gray-200 bg-white p-6 md:p-8">

                        <div className="flex flex-col items-center">

                            <span className="rounded-lg bg-black px-4 py-2 font-mono text-sm text-white">
                                order.created
                            </span>


                            <div className="my-5 h-10 w-px bg-gray-300"></div>


                            <div className="grid w-full gap-5 md:grid-cols-2">

                                <EventCard
                                    title="Stock Update"
                                    description="Product Service consumes the event and reduces product stock."
                                />

                                <EventCard
                                    title="Email Confirmation"
                                    description="The order email consumer sends an order confirmation asynchronously."
                                />

                            </div>

                        </div>

                    </div>


                    {/* Actual flow */}

                    <div className="mt-8 overflow-x-auto rounded-2xl border border-gray-200 bg-white p-6">

                        <div className="flex min-w-[700px] items-center justify-center gap-3 font-mono text-xs">

                            <span className="rounded-lg bg-gray-100 px-4 py-3">
                                Order Service
                            </span>

                            <span className="text-gray-400">
                                →
                            </span>

                            <span className="rounded-lg bg-black px-4 py-3 text-white">
                                order.created
                            </span>

                            <span className="text-gray-400">
                                →
                            </span>

                            <span className="rounded-lg bg-gray-100 px-4 py-3">
                                Redis Pub/Sub
                            </span>

                            <span className="text-gray-400">
                                →
                            </span>

                            <span className="rounded-lg bg-gray-100 px-4 py-3">
                                Consumers
                            </span>

                        </div>

                    </div>

                </div>

            </section>


            {/* ================= DOCKER + DEPLOYMENT ================= */}

            <section className="px-4 py-20">

                <div className="mx-auto max-w-6xl">

                    <p className="font-mono text-xs uppercase tracking-widest text-gray-400">
                        07 / Infrastructure
                    </p>

                    <h2 className="mt-3 text-3xl font-bold tracking-tight md:text-4xl">
                        From containers to the cloud
                    </h2>

                    <p className="mt-4 max-w-3xl leading-7 text-gray-600">
                        The backend services are containerized with Docker and
                        deployed on an Ubuntu AWS EC2 instance behind Nginx.
                    </p>


                    <div className="mt-10 grid gap-5 md:grid-cols-3">

                        <InfrastructureCard
                            title="Docker"
                            description="Each backend service and the gateway run as isolated containers."
                        />

                        <InfrastructureCard
                            title="Ubuntu + EC2"
                            description="The application runs on an AWS EC2 Ubuntu server."
                        />

                        <InfrastructureCard
                            title="Nginx"
                            description="Nginx acts as the public entry point and routes API traffic."
                        />

                    </div>


                    {/* Deployment flow */}

                    <div className="mt-8 overflow-x-auto rounded-3xl border border-gray-200 bg-gray-50 p-6 md:p-10">

                        <p className="mb-6 text-center font-mono text-xs uppercase tracking-widest text-gray-400">
                            Deployment Flow
                        </p>

                        <div className="flex min-w-[750px] items-center justify-center gap-3 font-mono text-xs">

                            <span className="rounded-xl border border-gray-200 bg-white px-4 py-3">
                                React
                            </span>

                            <span className="text-gray-400">
                                →
                            </span>

                            <span className="rounded-xl border border-gray-200 bg-white px-4 py-3">
                                Nginx
                            </span>

                            <span className="text-gray-400">
                                →
                            </span>

                            <span className="rounded-xl border border-gray-200 bg-white px-4 py-3">
                                Docker
                            </span>

                            <span className="text-gray-400">
                                →
                            </span>

                            <span className="rounded-xl bg-black px-4 py-3 text-white">
                                AWS EC2
                            </span>

                        </div>

                    </div>

                </div>

            </section>


            {/* ================= WHY ================= */}

            <section className="border-t border-gray-100 bg-gray-50 px-4 py-20">

                <div className="mx-auto max-w-6xl">

                    <p className="font-mono text-xs uppercase tracking-widest text-gray-400">
                        08 / Design Principles
                    </p>

                    <h2 className="mt-3 text-3xl font-bold tracking-tight md:text-4xl">
                        Why this structure?
                    </h2>


                    <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">

                        <Principle
                            title="Separation"
                            description="Each service owns a focused part of the application."
                        />

                        <Principle
                            title="Scalability"
                            description="Services can evolve and scale independently."
                        />

                        <Principle
                            title="Resilience"
                            description="Event-driven operations reduce direct dependencies."
                        />

                        <Principle
                            title="Maintainability"
                            description="Clear service boundaries make the codebase easier to understand."
                        />

                    </div>

                </div>

            </section>


            {/* ================= FINAL ================= */}

            <section className="px-4 py-24">

                <div className="mx-auto max-w-4xl text-center">

                    <p className="font-mono text-sm text-gray-400">
                        / end
                    </p>

                    <h2 className="mt-4 text-3xl font-bold tracking-tight md:text-5xl">
                        Built as a learning project.
                        <br />
                        Structured like a real system.
                    </h2>

                    <p className="mx-auto mt-6 max-w-2xl leading-7 text-gray-600">
                        This architecture was built to understand how modern
                        backend services, databases, caching, events,
                        containers and cloud infrastructure work together.
                    </p>

                </div>

            </section>

        </main>
    )
}


/* ========================================================= */
/* Reusable Components */
/* ========================================================= */


function ArchitectureBox({
    number,
    label,
    title,
    description,
    badge,
}) {
    return (
        <div className="w-full max-w-sm rounded-2xl border border-gray-200 bg-white p-6 text-center shadow-sm">

            <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-xl bg-gray-900 font-mono text-sm text-white">
                {number}
            </div>

            <p className="mt-4 font-mono text-[10px] uppercase tracking-widest text-gray-400">
                {label}
            </p>

            <h3 className="mt-2 text-xl font-semibold">
                {title}
            </h3>

            <p className="mt-2 text-sm leading-6 text-gray-500">
                {description}
            </p>

            {badge && (
                <span className="mt-4 inline-flex rounded-lg bg-gray-50 px-3 py-1.5 font-mono text-xs text-gray-500">
                    {badge}
                </span>
            )}

        </div>
    )
}


function ArchitectureArrow({ label }) {
    return (
        <div className="flex flex-col items-center py-5">

            <div className="h-8 w-px bg-gray-300"></div>

            <span className="mt-2 font-mono text-[10px] text-gray-400">
                {label}
            </span>

        </div>
    )
}


function ServiceBox({
    letter,
    title,
    port,
    description,
}) {
    return (
        <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">

            <div className="flex items-start justify-between">

                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gray-900 font-mono text-sm text-white">
                    {letter}
                </div>

                <span className="rounded-full bg-green-50 px-3 py-1 font-mono text-[10px] text-green-600">
                    {port}
                </span>

            </div>

            <p className="mt-5 font-mono text-[10px] uppercase tracking-widest text-gray-400">
                Service
            </p>

            <h3 className="mt-2 text-xl font-semibold">
                {title}
            </h3>

            <p className="mt-2 text-sm leading-6 text-gray-500">
                {description}
            </p>

        </div>
    )
}


function DataBox({
    title,
    description,
}) {
    return (
        <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">

            <p className="font-mono text-xs uppercase tracking-widest text-gray-400">
                Database
            </p>

            <h3 className="mt-3 text-xl font-semibold">
                {title}
            </h3>

            <span className="mt-3 inline-flex rounded-full bg-blue-50 px-3 py-1 font-mono text-[10px] text-blue-600">
                PostgreSQL
            </span>

            <p className="mt-4 text-sm leading-6 text-gray-500">
                {description}
            </p>

            <div className="mt-5 border-t border-gray-100 pt-4">

                <p className="font-mono text-[10px] uppercase tracking-widest text-gray-400">
                    Provider
                </p>

                <p className="mt-1 text-sm font-medium">
                    Neon
                </p>

            </div>

        </div>
    )
}


function FlowStep({
    number,
    title,
    description,
}) {
    return (
        <div className="flex gap-5 rounded-2xl border border-gray-200 bg-white p-5">

            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-black font-mono text-xs text-white">
                {number}
            </div>

            <div>

                <h3 className="font-semibold">
                    {title}
                </h3>

                <p className="mt-1 text-sm leading-6 text-gray-500">
                    {description}
                </p>

            </div>

        </div>
    )
}


function DetailedService({
    title,
    port,
    items,
}) {
    return (
        <div className="rounded-3xl border border-gray-200 bg-white p-7 shadow-sm">

            <div className="flex items-center justify-between">

                <h3 className="text-xl font-semibold">
                    {title}
                </h3>

                <span className="rounded-full bg-gray-100 px-3 py-1 font-mono text-xs text-gray-500">
                    :{port}
                </span>

            </div>

            <div className="mt-6 space-y-3">

                {items.map((item) => (
                    <div
                        key={item}
                        className="flex items-center gap-3 text-sm text-gray-600"
                    >
                        <span className="h-1.5 w-1.5 rounded-full bg-gray-900"></span>

                        {item}
                    </div>
                ))}

            </div>

        </div>
    )
}


function DatabaseCard({
    title,
    database,
    owner,
    data,
}) {
    return (
        <div className="rounded-3xl border border-gray-200 bg-white p-7">

            <p className="font-mono text-xs uppercase tracking-widest text-gray-400">
                {title}
            </p>

            <h3 className="mt-4 text-xl font-semibold">
                {database}
            </h3>

            <div className="mt-6 grid gap-4 sm:grid-cols-2">

                <div className="rounded-xl bg-gray-50 p-4">

                    <p className="font-mono text-[10px] uppercase tracking-widest text-gray-400">
                        Owned by
                    </p>

                    <p className="mt-2 text-sm font-medium">
                        {owner}
                    </p>

                </div>


                <div className="rounded-xl bg-gray-50 p-4">

                    <p className="font-mono text-[10px] uppercase tracking-widest text-gray-400">
                        Stores
                    </p>

                    <p className="mt-2 text-sm font-medium">
                        {data}
                    </p>

                </div>

            </div>

        </div>
    )
}


function InfoCard({
    number,
    title,
    description,
}) {
    return (
        <div className="rounded-3xl border border-gray-200 bg-white p-7">

            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-black font-mono text-xs text-white">
                {number}
            </div>

            <h3 className="mt-5 text-xl font-semibold">
                {title}
            </h3>

            <p className="mt-3 text-sm leading-7 text-gray-500">
                {description}
            </p>

        </div>
    )
}


function EventCard({
    title,
    description,
}) {
    return (
        <div className="rounded-2xl border border-gray-200 bg-gray-50 p-6">

            <div className="flex items-center gap-2">

                <span className="h-2 w-2 rounded-full bg-green-500"></span>

                <span className="font-mono text-[10px] uppercase tracking-widest text-gray-400">
                    Consumer
                </span>

            </div>

            <h3 className="mt-4 text-lg font-semibold">
                {title}
            </h3>

            <p className="mt-2 text-sm leading-6 text-gray-500">
                {description}
            </p>

        </div>
    )
}


function InfrastructureCard({
    title,
    description,
}) {
    return (
        <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">

            <p className="font-mono text-xs uppercase tracking-widest text-gray-400">
                Infrastructure
            </p>

            <h3 className="mt-3 text-xl font-semibold">
                {title}
            </h3>

            <p className="mt-3 text-sm leading-6 text-gray-500">
                {description}
            </p>

        </div>
    )
}


function Principle({
    title,
    description,
}) {
    return (
        <div className="rounded-2xl border border-gray-200 bg-white p-6">

            <h3 className="font-semibold">
                {title}
            </h3>

            <p className="mt-2 text-sm leading-6 text-gray-500">
                {description}
            </p>

        </div>
    )
}


export default Architecture