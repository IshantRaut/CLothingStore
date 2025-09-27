import { useState } from "react";
import { motion } from "framer-motion";
import { PlusCircle, Upload, Loader } from "lucide-react";
import { useProductStore } from "../stores/useProductStore";

const categories = ["jeans", "t-shirts", "shoes", "glasses", "jackets", "suits", "bags"];

const CreateProductForm = () => {
    const [newProduct, setNewProduct] = useState({
        name: "",
        description: "",
        price: "",
        category: "",
        image: "",
    });

    const { createProduct, loading } = useProductStore();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!newProduct.name || !newProduct.description || !newProduct.price || !newProduct.category || !newProduct.image) return;

        try {
            await createProduct(newProduct);
            setNewProduct({ name: "", description: "", price: "", category: "", image: "" });
        } catch {
            console.log("Error creating product");
        }
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onloadend = () => setNewProduct({ ...newProduct, image: reader.result });
        reader.readAsDataURL(file);
    };

    return (
        <motion.div
            className="relative bg-gradient-to-br from-blue-900 via-purple-900 to-slate-900 shadow-2xl rounded-2xl p-10 mb-12 max-w-xl mx-auto overflow-hidden"
            initial={{ opacity: 0, y: 40, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
        >
            {/* Decorative Glow */}
            <motion.div
                className="absolute inset-0 pointer-events-none"
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.18 }}
                style={{
                    background: "radial-gradient(ellipse 80% 60% at 50% 0%, #34d399 0%, #6366f1 40%, transparent 100%)",
                    zIndex: 0,
                }}
            />

            <motion.h2
                className="relative z-10 text-3xl font-extrabold bg-gradient-to-r from-emerald-400 via-blue-400 to-purple-400 bg-clip-text text-transparent text-center mb-8"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, ease: "easeOut" }}
            >
                Create New Product
                <motion.span
                    className="block mx-auto mt-2 h-1 w-24 rounded-full bg-gradient-to-r from-emerald-400 via-blue-400 to-purple-400"
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                />
            </motion.h2>

            <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
                {/* Product Name */}
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                >
                    <label htmlFor="name" className="block text-sm font-medium text-slate-200">Product Name</label>
                    <input
                        type="text"
                        id="name"
                        value={newProduct.name}
                        onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                        className="mt-1 block w-full bg-slate-800 border border-slate-700 rounded-md py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                        required
                    />
                </motion.div>

                {/* Description */}
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                >
                    <label htmlFor="description" className="block text-sm font-medium text-slate-200">Description</label>
                    <textarea
                        id="description"
                        rows="3"
                        value={newProduct.description}
                        onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
                        className="mt-1 block w-full bg-slate-800 border border-slate-700 rounded-md py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                        required
                    />
                </motion.div>

                {/* Price */}
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                >
                    <label htmlFor="price" className="block text-sm font-medium text-slate-200">Price</label>
                    <input
                        type="number"
                        id="price"
                        step="0.01"
                        value={newProduct.price}
                        onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
                        className="mt-1 block w-full bg-slate-800 border border-slate-700 rounded-md py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                        required
                    />
                </motion.div>

                {/* Category */}
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.5 }}
                >
                    <label htmlFor="category" className="block text-sm font-medium text-slate-200">Category</label>
                    <select
                        id="category"
                        value={newProduct.category}
                        onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })}
                        className="mt-1 block w-full bg-slate-800 border border-slate-700 rounded-md py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                        required
                    >
                        <option value="">Select a category</option>
                        {categories.map((cat) => <option key={cat} value={cat}>{cat}</option>)}
                    </select>
                </motion.div>

                {/* Image Upload */}
                <motion.div
                    className="mt-1 flex items-center"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.6 }}
                >
                    <input type="file" id="image" className="sr-only" accept="image/*" onChange={handleImageChange} />
                    <label
                        htmlFor="image"
                        className="cursor-pointer bg-slate-800 py-2 px-3 border border-slate-700 rounded-md text-sm text-slate-200 hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 flex items-center"
                    >
                        <Upload className="h-5 w-5 mr-2" />
                        Upload Image
                    </label>
                    {newProduct.image && (
                        <motion.img
                            src={newProduct.image}
                            alt="Preview"
                            className="ml-4 h-12 w-12 object-cover rounded shadow-lg"
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ duration: 0.4 }}
                        />
                    )}
                </motion.div>

                {/* Submit Button */}
                <motion.button
                    type="submit"
                    className="w-full flex justify-center py-2 px-4 rounded-full shadow-lg text-sm font-semibold text-white bg-gradient-to-r from-emerald-500 via-blue-500 to-purple-500 hover:from-emerald-600 hover:to-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 disabled:opacity-50 transition"
                    disabled={loading || !newProduct.name || !newProduct.price || !newProduct.category || !newProduct.image}
                    whileHover={{ scale: 1.04 }}
                    whileTap={{ scale: 0.97 }}
                >
                    {loading ? (
                        <><Loader className="mr-2 h-5 w-5 animate-spin" />Loading...</>
                    ) : (
                        <><PlusCircle className="mr-2 h-5 w-5" />Create Product</>
                    )}
                </motion.button>
            </form>
        </motion.div>
    );
};

export default CreateProductForm;