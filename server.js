import express from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import sellerRoutes from "./routes/sellerRoutes.js";

dotenv.config();
connectDB();

const app = express();
app.use(bodyParser.json());

app.use("/api/seller", sellerRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
