import { ShoppingCart, UserPlus, LogIn, LogOut, Lock } from "lucide-react";
import { Link } from "react-router-dom";
import { useUserStore } from "../stores/useUserStore";
import { useCartStore } from "../stores/useCartStore";
import { motion } from "framer-motion";

const navLinks = [
    { to: "/", label: "Home" },
];

const Navbar = () => {
    const { user, logout } = useUserStore();
    const isAdmin = user?.role === "admin";
    const { cart } = useCartStore();

    return (
        <header className="fixed top-0 left-0 w-full z-40">
            <motion.div
                className="bg-white/70 backdrop-blur-xl border-b border-blue-200/40 shadow-lg"
                initial={{ y: -60, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.7, ease: "easeOut" }}
            >
                <div className="container mx-auto px-4 py-3">
                    <div className="flex flex-wrap justify-between items-center">
                        <Link
                            to="/"
                            className="text-3xl font-extrabold text-blue-700 flex items-center space-x-2 tracking-tight drop-shadow-sm"
                        >
                            <motion.span
                                initial={{ scale: 0.9 }}
                                animate={{ scale: 1 }}
                                transition={{ type: "spring", stiffness: 300 }}
                            >
                                FashionCell
                            </motion.span>
                        </Link>

                        <nav className="flex flex-wrap items-center gap-2 sm:gap-4">
                            {navLinks.map((link) => (
                                <motion.div
                                    key={link.label}
                                    whileHover="hover"
                                    className="relative"
                                >
                                    <Link
                                        to={link.to}
                                        className="text-slate-700 font-medium px-3 py-1 transition-colors duration-300 ease-in-out"
                                    >
                                        <motion.span
                                            variants={{
                                                hover: { color: "#2563eb" },
                                            }}
                                        >
                                            {link.label}
                                        </motion.span>
                                        <motion.span
                                            className="absolute left-0 -bottom-1 w-full h-0.5 bg-blue-500 rounded-full"
                                            variants={{
                                                hover: { scaleX: 1 },
                                                initial: { scaleX: 0 },
                                            }}
                                            initial="initial"
                                            transition={{ duration: 0.3 }}
                                            style={{ originX: 0 }}
                                        />
                                    </Link>
                                </motion.div>
                            ))}

                            {user && (
                                <Link
                                    to={"/cart"}
                                    className="relative group text-slate-700 hover:text-blue-600 transition duration-300 ease-in-out flex items-center"
                                >
                                    <motion.div
                                        whileHover={{ scale: 1.15, rotate: -10 }}
                                        className="relative"
                                    >
                                        <ShoppingCart className="inline-block mr-1 group-hover:text-blue-600" size={22} />
                                        {cart.length > 0 && (
                                            <motion.span
                                                className="absolute -top-2 -left-2 bg-blue-600 text-white rounded-full px-2 py-0.5 text-xs font-bold shadow-lg"
                                                initial={{ scale: 0.8 }}
                                                animate={{ scale: 1.1 }}
                                                transition={{
                                                    type: "spring",
                                                    stiffness: 300,
                                                    repeat: Infinity,
                                                    repeatType: "reverse",
                                                    duration: 1,
                                                }}
                                            >
                                                {cart.length}
                                            </motion.span>
                                        )}
                                    </motion.div>
                                    <span className="hidden sm:inline">Cart</span>
                                </Link>
                            )}

                            {isAdmin && (
                                <Link
                                    to={"/secret-dashboard"}
                                    className="bg-gradient-to-r from-blue-600 to-blue-400 hover:from-blue-700 hover:to-blue-500 text-white px-4 py-2 rounded-full font-semibold flex items-center shadow-md transition duration-300 ease-in-out"
                                >
                                    <Lock className="inline-block mr-2" size={20} />
                                    <span className="hidden sm:inline">Dashboard</span>
                                </Link>
                            )}

                            {user ? (
                                <motion.button
                                    onClick={logout}
                                    className="bg-slate-100 hover:bg-slate-200 text-slate-700 py-2 px-4 rounded-full flex items-center font-semibold shadow transition duration-300 ease-in-out"
                                    whileHover={{ scale: 1.05, backgroundColor: "#e0e7ff" }}
                                >
                                    <LogOut size={20} />
                                    <span className="hidden sm:inline ml-2">Log Out</span>
                                </motion.button>
                            ) : (
                                <>
                                    <motion.div whileHover={{ scale: 1.07 }}>
                                        <Link
                                            to={"/signup"}
                                            className="bg-gradient-to-r from-blue-600 to-blue-400 hover:from-blue-700 hover:to-blue-500 text-white py-2 px-4 rounded-full flex items-center font-semibold shadow transition duration-300 ease-in-out"
                                        >
                                            <UserPlus className="mr-2" size={20} />
                                            Sign Up
                                        </Link>
                                    </motion.div>
                                    <motion.div whileHover={{ scale: 1.07 }}>
                                        <Link
                                            to={"/login"}
                                            className="bg-slate-100 hover:bg-slate-200 text-slate-700 py-2 px-4 rounded-full flex items-center font-semibold shadow transition duration-300 ease-in-out"
                                        >
                                            <LogIn className="mr-2" size={20} />
                                            Login
                                        </Link>
                                    </motion.div>
                                </>
                            )}
                        </nav>
                    </div>
                </div>
            </motion.div>
        </header>
    );
};

export default Navbar;