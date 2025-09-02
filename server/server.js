import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.js";
import productRoutes from "./routes/product.js";
import orderRoutes from "./routes/order.js";

dotenv.config();

// Provide safe defaults for development to prevent startup crashes
process.env.JWT_SECRET = process.env.JWT_SECRET || "dev_secret";

const app = express();
app.use(cors());
app.use(express.json());

// ✅ Connect MongoDB
const mongoUri = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/ecommerce";
if (!process.env.MONGO_URI) {
	console.warn("MONGO_URI not set. Using default local MongoDB at mongodb://127.0.0.1:27017/ecommerce");
}
mongoose.connect(mongoUri)
.then(() => console.log("✅ Connected to MongoDB"))
.catch(err => console.error("❌ MongoDB connection error:", err));

// ✅ Sample route
app.get("/", (req, res) => {
  res.send("API is running...");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`🌐 API available at http://localhost:${PORT}`);
  console.log(`📱 Frontend should run on http://localhost:3000`);
});


app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/orders", orderRoutes);
