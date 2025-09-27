import { Minus, Plus, Trash } from "lucide-react";
import { useCartStore } from "../stores/useCartStore";
import { motion } from "framer-motion";

const CartItem = ({ item }) => {
    const { removeFromCart, updateQuantity } = useCartStore();

    return (
        <motion.div
            className="rounded-xl border p-4 shadow-lg border-slate-200 bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100 md:p-6 transition-all"
            initial={{ opacity: 0, y: 30, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.98 }}
            whileHover={{ boxShadow: "0 8px 32px rgba(59,130,246,0.15)", scale: 1.02 }}
        >
            <div className="space-y-4 md:flex md:items-center md:justify-between md:gap-6 md:space-y-0">
                <div className="shrink-0 md:order-1">
                    <motion.img
                        className="h-20 md:h-32 rounded-lg object-cover transition-transform"
                        src={item.image}
                        alt={item.name}
                        whileHover={{ scale: 1.08 }}
                    />
                </div>
                <label className="sr-only">Choose quantity:</label>

                <div className="flex items-center justify-between md:order-3 md:justify-end">
                    <div className="flex items-center gap-2">
                        <motion.button
                            className="inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-md border
                             border-slate-300 bg-slate-100 hover:bg-blue-100 focus:outline-none focus:ring-2
                              focus:ring-blue-500 transition"
                            onClick={() => updateQuantity(item._id, item.quantity - 1)}
                            whileTap={{ scale: 0.9 }}
                            disabled={item.quantity <= 1}
                        >
                            <Minus className="text-blue-600" size={16} />
                        </motion.button>
                        <p className="text-blue-700 font-semibold text-lg">{item.quantity}</p>
                        <motion.button
                            className="inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-md border
                             border-slate-300 bg-slate-100 hover:bg-blue-100 focus:outline-none 
                        focus:ring-2 focus:ring-blue-500 transition"
                            onClick={() => updateQuantity(item._id, item.quantity + 1)}
                            whileTap={{ scale: 0.9 }}
                        >
                            <Plus className="text-blue-600" size={16} />
                        </motion.button>
                    </div>

                    <div className="text-end md:order-4 md:w-32">
                        <motion.p
                            className="text-lg font-bold text-blue-600"
                            initial={{ scale: 1 }}
                            animate={{ scale: [1, 1.08, 1] }}
                            transition={{ repeat: 0, duration: 0.5 }}
                        >
                            ${item.price}
                        </motion.p>
                    </div>
                </div>

                <div className="w-full min-w-0 flex-1 space-y-4 md:order-2 md:max-w-md">
                    <motion.p
                        className="text-base font-semibold text-gray-900 hover:text-blue-600 hover:underline transition"
                        whileHover={{ color: "#2563eb", scale: 1.03 }}
                    >
                        {item.name}
                    </motion.p>
                    <p className="text-sm text-gray-500">{item.description}</p>

                    <div className="flex items-center gap-4">
                        <motion.button
                            className="inline-flex items-center text-sm font-medium text-red-600
                             hover:text-red-500 hover:underline transition"
                            onClick={() => removeFromCart(item._id)}
                            whileHover={{ scale: 1.08, color: "#dc2626" }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <Trash size={18} />
                            <span className="ml-1">Remove</span>
                        </motion.button>
                    </div>
                </div>
            </div>
        </motion.div>
    );
};
export default CartItem;