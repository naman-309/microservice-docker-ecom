
function TechCard({ tech, index }) {
    return (
        <div className="group rounded-2xl border border-gray-200 bg-white p-6 transition duration-300 hover:-translate-y-1 hover:border-gray-300 hover:shadow-lg">

            {/* Top Row */}
            <div className="flex items-center justify-between">

                <span className="font-mono text-xs text-gray-400">
                    {String(index + 1).padStart(2, "0")}
                </span>

                <span className="rounded-full bg-gray-100 px-2 py-1 font-mono text-[10px] text-gray-500">
                    {tech.type}
                </span>

            </div>

            {/* Technology Name */}
            <h3 className="mt-7 text-lg font-semibold text-gray-900">
                {tech.name}
            </h3>

            {/* Description */}
            <p className="mt-3 text-sm leading-6 text-gray-600">
                {tech.description}
            </p>

            {/* Hover Line */}
            <div className="mt-6 h-px w-8 bg-gray-300 transition-all duration-300 group-hover:w-full group-hover:bg-gray-700"></div>

        </div>
    )
}

export default TechCard
