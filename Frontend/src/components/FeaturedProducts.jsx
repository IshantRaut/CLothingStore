import { useEffect, useState } from "react";
import { ShoppingCart, ChevronLeft, ChevronRight } from "lucide-react";
import { useCartStore } from "../stores/useCartStore";
import { motion, AnimatePresence } from "framer-motion";

const sectionVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } },
};

const cardVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.96 },
    visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.5 } },
};

const FeaturedProducts = ({ featuredProducts }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [itemsPerPage, setItemsPerPage] = useState(4);

    const { addToCart } = useCartStore();

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth < 640) setItemsPerPage(1);
            else if (window.innerWidth < 1024) setItemsPerPage(2);
            else if (window.innerWidth < 1280) setItemsPerPage(3);
            else setItemsPerPage(4);
        };

        handleResize();
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    const nextSlide = () => {
        setCurrentIndex((prevIndex) =>
            prevIndex + itemsPerPage >= featuredProducts.length ? 0 : prevIndex + itemsPerPage
        );
    };

    const prevSlide = () => {
        setCurrentIndex((prevIndex) =>
            prevIndex - itemsPerPage < 0 ? Math.max(featuredProducts.length - itemsPerPage, 0) : prevIndex - itemsPerPage
        );
    };

    const slideWidth = 100 / itemsPerPage;

    return (
        <motion.section
            className="py-12 relative"
            initial="hidden"
            animate="visible"
            variants={sectionVariants}
        >
            {/* Decorative background glow */}
            <motion.div
                className="absolute inset-0 pointer-events-none"
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.15 }}
                style={{
                    background: "radial-gradient(ellipse 80% 60% at 50% 0%, #34d399 0%, #6366f1 40%, transparent 100%)",
                    zIndex: 0,
                }}
            />

            <div className="container mx-auto px-4 relative z-10">
                <motion.h2
                    className="text-center text-5xl sm:text-6xl font-extrabold bg-gradient-to-r from-emerald-400 via-blue-400 to-purple-400 bg-clip-text text-transparent mb-4"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, ease: "easeOut" }}
                >
                    Featured
                    <motion.span
                        className="block mx-auto mt-2 h-1 w-24 rounded-full bg-gradient-to-r from-emerald-400 via-blue-400 to-purple-400"
                        initial={{ scaleX: 0 }}
                        animate={{ scaleX: 1 }}
                        transition={{ duration: 0.6, delay: 0.3 }}
                    />
                </motion.h2>
                <div className="relative">
                    <div className="overflow-hidden">
                        <div
                            className="flex transition-transform duration-500 ease-in-out"
                            style={{ transform: `translateX(-${currentIndex * slideWidth}%)` }}
                        >
                            {featuredProducts?.map((product, idx) => (
                                <AnimatePresence key={product._id}>
                                    <motion.div
                                        className="flex-shrink-0 px-2"
                                        style={{ width: `${slideWidth}%` }}
                                        variants={cardVariants}
                                        initial="hidden"
                                        animate="visible"
                                        exit="hidden"
                                    >
                                        <motion.div
                                            className="bg-white bg-opacity-10 backdrop-blur-xl rounded-xl shadow-xl overflow-hidden h-full transition-all duration-300 hover:shadow-2xl border border-emerald-500/30 group"
                                            whileHover={{ scale: 1.04, boxShadow: "0 8px 32px rgba(52,211,153,0.15)" }}
                                        >
                                            <div className="overflow-hidden">
                                                <motion.img
                                                    src={product.image}
                                                    alt={product.name}
                                                    className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110"
                                                    loading="lazy"
                                                    whileHover={{ scale: 1.08 }}
                                                />
                                            </div>
                                            <div className="p-4">
                                                <motion.h3
                                                    className="text-lg font-semibold mb-2 text-white"
                                                    initial={{ y: 10, opacity: 0 }}
                                                    animate={{ y: 0, opacity: 1 }}
                                                    transition={{ duration: 0.5, delay: 0.2 }}
                                                >
                                                    {product.name}
                                                </motion.h3>
                                                <motion.p
                                                    className="text-emerald-300 font-bold mb-4 text-xl"
                                                    initial={{ scale: 1 }}
                                                    animate={{ scale: [1, 1.08, 1] }}
                                                    transition={{ repeat: 0, duration: 0.6 }}
                                                >
                                                    ${product.price.toFixed(2)}
                                                </motion.p>
                                                <motion.button
                                                    onClick={() => addToCart(product)}
                                                    className="w-full bg-gradient-to-r from-emerald-600 to-blue-600 hover:from-emerald-700 hover:to-blue-700 text-white font-semibold py-2 px-4 rounded-lg shadow-lg transition-colors duration-300 flex items-center justify-center"
                                                    whileHover={{ scale: 1.04 }}
                                                    whileTap={{ scale: 0.97 }}
                                                >
                                                    <ShoppingCart className="w-5 h-5 mr-2" />
                                                    Add to Cart
                                                </motion.button>
                                            </div>
                                        </motion.div>
                                    </motion.div>
                                </AnimatePresence>
                            ))}
                        </div>
                    </div>

                    {/* Navigation */}
                    <motion.button
                        onClick={prevSlide}
                        className="absolute top-1/2 -left-4 transform -translate-y-1/2 p-2 rounded-full bg-gradient-to-r from-emerald-600 to-blue-600 hover:from-emerald-700 hover:to-blue-700 text-white shadow-lg transition-colors duration-300"
                        whileHover={{ scale: 1.15, rotate: -10 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        <ChevronLeft className="w-6 h-6" />
                    </motion.button>
                    <motion.button
                        onClick={nextSlide}
                        className="absolute top-1/2 -right-4 transform -translate-y-1/2 p-2 rounded-full bg-gradient-to-r from-emerald-600 to-blue-600 hover:from-emerald-700 hover:to-blue-700 text-white shadow-lg transition-colors duration-300"
                        whileHover={{ scale: 1.15, rotate: 10 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        <ChevronRight className="w-6 h-6" />
                    </motion.button>
                </div>
            </div>
        </motion.section>
    );
};

export default FeaturedProducts;