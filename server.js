import express from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import sellerRoutes from "./routes/sellerRoutes.js";
import verificationRoutes from "./routes/verificationRoutes.js";

dotenv.config();
connectDB();

const app = express();
app.use(bodyParser.json());

// Routes
app.use("/api/seller", sellerRoutes);
app.use("/api/verify", verificationRoutes); // ✅ new route

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
