import products from "../../data/products"
import ProductCard from "../product/ProductCard"

function FeaturedProducts() {
    return (
        <section className="border-t border-gray-100 px-4 py-20">

            <div className="mx-auto max-w-7xl">

                {/* Section Header */}
                <div className="mb-10 flex flex-col justify-between gap-5 md:flex-row md:items-end">

                    <div>

                        <p className="text-sm font-medium uppercase tracking-widest text-gray-400">
                            Curated collection
                        </p>

                        <h2 className="mt-2 text-3xl font-bold tracking-tight md:text-4xl">
                            Featured Products
                        </h2>

                        <p className="mt-3 max-w-xl text-gray-500">
                            Explore some of the products available on our
                            platform, built for a modern shopping experience.
                        </p>

                    </div>

                    {/* View All */}
                    <button className="w-fit rounded-xl border border-gray-300 px-5 py-3 text-sm font-medium transition hover:bg-black hover:text-white">
                        View all products →
                    </button>

                </div>


                {/* Products */}
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">

                    {products.slice(0, 4).map((product) => (
                        <ProductCard
                            key={product.id}
                            product={product}
                        />
                    ))}

                </div>


                {/* Small Bottom Message */}
                <div className="mt-10 flex flex-col items-center justify-between gap-3 rounded-2xl border border-gray-200 bg-gray-50 px-6 py-5 text-center sm:flex-row sm:text-left">

                    <div>
                        <p className="font-medium">
                            More products are waiting.
                        </p>

                        <p className="text-sm text-gray-500">
                            Browse the complete collection and discover more.
                        </p>
                    </div>

                    <span className="font-mono text-sm text-gray-400">
                        dev@nkkr / products
                    </span>

                </div>

            </div>

        </section>
    )
}

export default FeaturedProducts
