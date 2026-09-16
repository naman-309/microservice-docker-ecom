import techStack from "../../data/techStack"
import TechCard from "./TechCard"

function TechStack() {
    return (
        <section className="border-t border-gray-100 bg-gray-50 px-4 py-20">

            <div className="mx-auto max-w-7xl">

                {/* Heading */}
                <div className="max-w-2xl">

                    <p className="font-mono text-sm text-gray-500">
                        / technology
                    </p>

                    <h2 className="mt-3 text-3xl font-bold tracking-tight text-gray-900 md:text-4xl">
                        Built with modern technology
                    </h2>

                    <p className="mt-4 text-base leading-7 text-gray-600">
                        A modern stack powering the frontend, backend,
                        data layer and infrastructure.
                    </p>

                </div>


                {/* Technology Grid */}
                <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">

                    {techStack.map((tech, index) => (
                        <TechCard
                            key={tech.name}
                            tech={tech}
                            index={index}
                        />
                    ))}

                </div>


                {/* Bottom Info */}
                <div className="mt-10 flex flex-col justify-between gap-3 border-t border-gray-200 pt-6 sm:flex-row sm:items-center">

                    <p className="text-sm text-gray-500">
                        10 technologies • One scalable platform
                    </p>

                    <p className="font-mono text-sm text-gray-400">
                        dev@nkkr / stack
                    </p>

                </div>

            </div>

        </section>
    )
}

export default TechStack
