import { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import axios from "../lib/axios";
import toast from "react-hot-toast";
import LoadingSpinner from "./LoadingSpinner";
import { motion, AnimatePresence } from "framer-motion";

const containerVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            staggerChildren: 0.15,
            delayChildren: 0.2,
            duration: 0.7,
            ease: "easeOut",
        },
    },
};

const cardVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.96 },
    visible: { opacity: 1, y: 0, scale: 1 },
};

const PeopleAlsoBought = () => {
    const [recommendations, setRecommendations] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchRecommendations = async () => {
            try {
                const res = await axios.get("/products/recommendations");
                setRecommendations(res.data);
            } catch (error) {
                toast.error(error?.response?.data?.message || "An error occurred while fetching recommendations");
            } finally {
                setIsLoading(false);
            }
        };

        fetchRecommendations();
    }, []);

    if (isLoading) return <LoadingSpinner />;

    return (
        <motion.section
            className="relative mt-12 mb-8 px-2 py-8 rounded-2xl overflow-hidden"
            initial="hidden"
            animate="visible"
            variants={containerVariants}
        >
            {/* Decorative background glow */}
            <motion.div
                className="absolute inset-0 pointer-events-none"
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.18 }}
                style={{
                    background: "radial-gradient(ellipse 80% 60% at 50% 0%, #3b82f6 0%, #a5b4fc 40%, transparent 100%)",
                    zIndex: 0,
                }}
            />

            {/* Animated Heading */}
            <motion.h3
                className="relative z-10 text-3xl font-extrabold bg-gradient-to-r from-blue-500 via-purple-500 to-blue-400 bg-clip-text text-transparent text-center mb-8"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, ease: "easeOut" }}
            >
                People Also Bought
                <motion.span
                    className="block mx-auto mt-2 h-1 w-24 rounded-full bg-gradient-to-r from-blue-400 via-purple-400 to-blue-300"
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                />
            </motion.h3>

            {/* Product Cards with staggered animation */}
            <motion.div
                className="relative z-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
            >
                <AnimatePresence>
                    {recommendations.map((product, idx) => (
                        <motion.div
                            key={product._id}
                            variants={cardVariants}
                            initial="hidden"
                            animate="visible"
                            exit="hidden"
                            transition={{ duration: 0.5, delay: idx * 0.15 }}
                        >
                            <ProductCard product={product} />
                        </motion.div>
                    ))}
                </AnimatePresence>
            </motion.div>
        </motion.section>
    );
};

export default PeopleAlsoBought;