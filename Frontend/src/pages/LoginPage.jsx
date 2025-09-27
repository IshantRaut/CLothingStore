import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { LogIn, Mail, Lock, ArrowRight, Loader } from "lucide-react";
import { useUserStore } from "../stores/useUserStore";

const LoginPage = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const { login, loading } = useUserStore();

    const handleSubmit = (e) => {
        e.preventDefault();
        login(email, password);
    };

    return (
        <div className="relative flex flex-col justify-center py-12 sm:px-6 lg:px-8 min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-slate-950 overflow-hidden">
            {/* Animated floating circles */}
            <motion.div
                className="absolute top-0 left-0 w-full h-full pointer-events-none"
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.2 }}
                style={{ zIndex: 0 }}
            >
                <motion.div
                    className="absolute rounded-full bg-blue-500 blur-2xl"
                    style={{ width: 200, height: 200, top: 40, left: 60 }}
                    animate={{ y: [0, 30, 0], x: [0, 20, 0] }}
                    transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
                />
                <motion.div
                    className="absolute rounded-full bg-purple-500 blur-2xl"
                    style={{ width: 150, height: 150, bottom: 80, right: 80 }}
                    animate={{ y: [0, -20, 0], x: [0, -30, 0] }}
                    transition={{ repeat: Infinity, duration: 7, ease: "easeInOut" }}
                />
            </motion.div>

            <motion.div
                className="sm:mx-auto sm:w-full sm:max-w-md z-10"
                initial={{ opacity: 0, scale: 0.95, y: -20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.8 }}
            >
                <h2 className="mt-6 text-center text-3xl font-extrabold text-blue-400">
                    Login to your account
                </h2>
                <p className="text-center text-slate-300 mt-2 mb-2">
                    Welcome back! Ready to unlock your style?
                </p>
            </motion.div>

            <motion.div
                className="mt-8 sm:mx-auto sm:w-full sm:max-w-md z-10"
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
            >
                <motion.div
                    className="bg-slate-800/90 backdrop-blur-md py-8 px-6 shadow-xl rounded-2xl sm:px-10 border border-slate-700"
                    initial={{ scale: 0.98 }}
                    whileHover={{ scale: 1.01 }}
                    transition={{ type: "spring", stiffness: 300 }}
                >
                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Email */}
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-slate-300">
                                Email address
                            </label>
                            <div className="mt-1 relative rounded-md shadow-sm">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <Mail className="h-5 w-5 text-slate-400" aria-hidden="true" />
                                </div>
                                <input
                                    id="email"
                                    type="email"
                                    required
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="block w-full px-3 py-2 pl-10 bg-slate-900 border border-slate-700 
                                        rounded-md shadow-sm placeholder-slate-500 focus:outline-none focus:ring-2 
                                        focus:ring-blue-500 focus:border-blue-500 sm:text-sm text-slate-100"
                                    placeholder="you@example.com"
                                />
                            </div>
                        </div>

                        {/* Password */}
                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-slate-300">
                                Password
                            </label>
                            <div className="mt-1 relative rounded-md shadow-sm">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <Lock className="h-5 w-5 text-slate-400" aria-hidden="true" />
                                </div>
                                <input
                                    id="password"
                                    type="password"
                                    required
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="block w-full px-3 py-2 pl-10 bg-slate-900 border border-slate-700 
                                        rounded-md shadow-sm placeholder-slate-500 focus:outline-none focus:ring-2 
                                        focus:ring-blue-500 focus:border-blue-500 sm:text-sm text-slate-100"
                                    placeholder="••••••••"
                                />
                            </div>
                        </div>

                        {/* Submit Button */}
                        <motion.button
                            type="submit"
                            className="w-full flex justify-center items-center py-2 px-4 rounded-md shadow-md 
                                text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 
                                focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 
                                transition duration-150 ease-in-out disabled:opacity-50"
                            disabled={loading}
                            whileHover={{ scale: 1.04 }}
                            whileTap={{ scale: 0.98 }}
                        >
                            {loading ? (
                                <>
                                    <Loader className="mr-2 h-5 w-5 animate-spin" aria-hidden="true" />
                                    Loading...
                                </>
                            ) : (
                                <>
                                    <LogIn className="mr-2 h-5 w-5" aria-hidden="true" />
                                    Login
                                </>
                            )}
                        </motion.button>
                    </form>

                    {/* Footer */}
                    <p className="mt-8 text-center text-sm text-slate-400">
                        Not a member?{" "}
                        <Link to="/signup" className="font-medium text-blue-400 hover:text-blue-300">
                            Sign up now <ArrowRight className="inline h-4 w-4" />
                        </Link>
                    </p>
                </motion.div>
            </motion.div>
        </div>
    );
};

export default LoginPage;