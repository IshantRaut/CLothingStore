import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const CategoryItem = ({ category }) => {
    return (
        <motion.div
            className="relative overflow-hidden h-96 w-full rounded-lg group shadow-md hover:shadow-2xl transition-shadow duration-300"
            whileHover={{ scale: 1.03, y: -4 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
        >
            <Link to={"/category" + category.href}>
                <div className="w-full h-full cursor-pointer relative">
                    {/* Overlay */}
                    <motion.div
                        className="absolute inset-0 bg-gradient-to-b from-transparent to-slate-900/70 z-10"
                        initial={{ opacity: 0.7 }}
                        whileHover={{ opacity: 0.85 }}
                        transition={{ duration: 0.3 }}
                    />

                    {/* Image */}
                    <motion.img
                        src={category.imageUrl}
                        alt={category.name}
                        className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-110"
                        loading="lazy"
                        whileHover={{ scale: 1.08 }}
                    />

                    {/* Text */}
                    <motion.div
                        className="absolute bottom-0 left-0 right-0 p-6 z-20"
                        initial={{ y: 30, opacity: 0 }}
                        whileHover={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.4 }}
                    >
                        <h3 className="text-2xl font-bold text-blue-600 drop-shadow-md">{category.name}</h3>
                        <p className="text-slate-200 text-sm">Explore {category.name}</p>
                    </motion.div>
                </div>
            </Link>
        </motion.div>
    );
};

export default CategoryItem;