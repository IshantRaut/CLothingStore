import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import { connectDB } from "./lib/db.js";
import authRoutes from "./routes/auth.route.js";
import productRoutes from "./routes/product.route.js";
import couponRoutes from "./routes/coupon.route.js";
import paymentRoutes from "./routes/payment.route.js";
import analyticsRoutes from "./routes/analytics.route.js";
import cartRoutes from "./routes/cart.route.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

// ✅ CORS setup
const allowedOrigins = [
  process.env.FRONTEND_URL,   // deployed frontend URL
  "http://localhost:5173"     // local dev
];

app.use(cors({
  origin: function(origin, callback){
    if(!origin) return callback(null, true); // allow Postman / server requests
    if(allowedOrigins.indexOf(origin) === -1){
      return callback(new Error(`CORS error: ${origin} not allowed`), false);
    }
    return callback(null, true);
  },
  credentials: true,
}));

app.use(express.json({ limit: "10mb" }));
app.use(cookieParser());

// ✅ API routes
app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/coupons", couponRoutes);
app.use("/api/payments", paymentRoutes);
app.use("/api/analytics", analyticsRoutes);
app.use("/api/cart", cartRoutes);

// ✅ Default route to check server
app.get("/", (req, res) => {
  res.send("Backend is running!");
});

app.listen(PORT, () => {
  console.log("Server is running on port " + PORT);
  connectDB();
});
