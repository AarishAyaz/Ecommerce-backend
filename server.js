import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import morgan from "morgan";
import connectDB from "./config/db.js";
import adminRoutes from "./routes/adminRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import adminUserRoutes from "./routes/adminUsers.js";


dotenv.config();
connectDB();

const app = express();

app.use(cors({
  origin: [
    "https://ecommerce-frontend-swart-ten.vercel.app",
    "http://localhost:5173"
  ],
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));
app.use(express.json());
app.use(morgan("dev"));

// Routes
app.use("/api/admin/users", adminUserRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/users", userRoutes); // ✅ ADD THIS LINE

// app.use("/api/categories", categoryRoutes);
// app.use("/api/orders", orderRoutes);

app.get("/", (req, res) => res.send("Ecommerce API Running..."));

app.listen(process.env.PORT, () =>
  console.log(`Server running on port ${process.env.PORT}`)
);
