import toast from "react-hot-toast";
import { ShoppingCart } from "lucide-react";
import { useUserStore } from "../stores/useUserStore";
import { useCartStore } from "../stores/useCartStore";
import { motion } from "framer-motion";

const ProductCard = ({ product }) => {
    const { user } = useUserStore();
    const { addToCart } = useCartStore();

    const handleAddToCart = () => {
        if (!user) {
            toast.error("Please login to add products to cart", { id: "login" });
            return;
        }
        addToCart(product);
    };

    return (
        <motion.div
            className="flex w-full flex-col overflow-hidden rounded-2xl border border-blue-200/30 shadow-xl bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 group"
            initial={{ opacity: 0, y: 30, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            whileHover={{ scale: 1.03, boxShadow: "0 8px 32px rgba(59,130,246,0.15)" }}
            transition={{ duration: 0.5, ease: "easeOut" }}
        >
            <div className="relative mx-3 mt-3 h-60 overflow-hidden rounded-xl">
                <motion.img
                    className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-110"
                    src={product.image}
                    alt={product.name}
                    whileHover={{ scale: 1.08 }}
                />
                <motion.div
                    className="absolute inset-0 bg-gradient-to-b from-transparent to-blue-900/70 opacity-40"
                    initial={{ opacity: 0.3 }}
                    whileHover={{ opacity: 0.5 }}
                    transition={{ duration: 0.3 }}
                />
            </div>

            <div className="mt-4 px-5 pb-5">
                <motion.h5
                    className="text-xl font-semibold tracking-tight text-white"
                    initial={{ y: 10, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                >
                    {product.name}
                </motion.h5>
                <div className="mt-2 mb-5 flex items-center justify-between">
                    <motion.p
                        className="text-3xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-blue-600 bg-clip-text text-transparent"
                        initial={{ scale: 1 }}
                        animate={{ scale: [1, 1.08, 1] }}
                        transition={{ repeat: 0, duration: 0.6 }}
                    >
                        ${product.price}
                    </motion.p>
                </div>
                <motion.button
                    className="flex w-full items-center justify-center rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 px-5 py-2.5 text-sm font-semibold text-white shadow-lg
                        hover:from-blue-700 hover:to-purple-700 focus:outline-none focus:ring-4 focus:ring-blue-300 transition"
                    onClick={handleAddToCart}
                    whileHover={{ scale: 1.04, backgroundColor: "#2563eb" }}
                    whileTap={{ scale: 0.97 }}
                >
                    <ShoppingCart size={22} className="mr-2" />
                    Add to cart
                </motion.button>
            </div>
        </motion.div>
    );
};

export default ProductCard;