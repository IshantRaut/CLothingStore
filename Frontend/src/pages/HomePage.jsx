import { useEffect } from "react";
import CategoryItem from "../components/CategoryItem";
import { useProductStore } from "../stores/useProductStore";
import FeaturedProducts from "../components/FeaturedProducts";

const categories = [
    { href: "/jeans", name: "Jeans", imageUrl: "/jeans.jpg" },
    { href: "/t-shirts", name: "T-shirts", imageUrl: "/tshirts.jpg" },
    { href: "/shoes", name: "Shoes", imageUrl: "/shoes.jpg" },
    { href: "/glasses", name: "Glasses", imageUrl: "/glasses.png" },
    { href: "/jackets", name: "Jackets", imageUrl: "/jackets.jpg" },
    { href: "/suits", name: "Suits", imageUrl: "/suits.jpg" },
    { href: "/bags", name: "Bags", imageUrl: "/bags.jpg" },
];

const HomePage = () => {
    const { fetchFeaturedProducts, products, isLoading } = useProductStore();

    useEffect(() => {
        fetchFeaturedProducts();
    }, [fetchFeaturedProducts]);

    return (
        <div className="relative min-h-screen text-slate-100 overflow-hidden bg-gradient-to-br from-blue-900 via-blue-700 to-slate-900">
            {/* Hero Section */}
            <div className="relative h-[60vh] flex items-center justify-center bg-cover bg-center" style={{ backgroundImage: "url('/bags.jpg')" }}>
                <div className="absolute inset-0 bg-black bg-opacity-50"></div>

<div className="relative z-10 text-center">
    <h1 className="text-6xl font-extrabold text-white drop-shadow-lg mb-4">
        Welcome to TrendyWear
    </h1>
    <p className="text-xl text-blue-200 mb-6">
        Discover fashion that fits your vibe.<br />
        Unleash your style with eco-friendly trends and timeless classics!
    </p>
</div>


            </div>

            {/* Categories Section */}
            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <h2 className="text-center text-4xl font-bold text-blue-400 mb-4 drop-shadow-lg">
                    Explore Our Categories
                </h2>
                <p className="text-center text-lg text-slate-300 mb-12">
                    Find your perfect look for every occasion
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {categories.map((category) => (
                        <div className="transition-transform hover:scale-105">
                            <CategoryItem category={category} key={category.name} />
                        </div>
                    ))}
                </div>
            </div>

            {/* Featured Products */}
            {!isLoading && products.length > 0 && (
                <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16">
                    <h2 className="text-3xl font-semibold text-blue-300 mb-8 text-center">
                        Featured Products
                    </h2>
                    <FeaturedProducts featuredProducts={products} />
                </div>
            )}

            {/* Brand/Testimonials Section */}
            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="bg-slate-800 bg-opacity-70 rounded-xl p-8 text-center">
                    <h3 className="text-2xl font-bold text-blue-300 mb-4">Why Shop With Us?</h3>
                    <p className="text-slate-200 mb-2">✔️ Free Shipping on orders over $50</p>
                    <p className="text-slate-200 mb-2">✔️ 30-Day Easy Returns</p>
                    <p className="text-slate-200">✔️ Sustainable & Ethical Fashion</p>
                </div>
            </div>

            {/* Decorative Background */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="w-full h-full bg-[radial-gradient(ellipse_at_top,rgba(59,130,246,0.2)_0%,rgba(30,58,138,0.25)_45%,rgba(2,6,23,0.9)_100%)]"></div>
            </div>
        </div>
    );
};

export default HomePage;