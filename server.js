import express from "express";
import mongoose from "mongoose";
import productRoutes from "./routes/products.routes.js";
import cartRoutes from "./routes/cart.routes.js";
import authRoutes from "./routes/auth.routes.js";




const app = express();
app.use(express.json()); // Middleware to parse JSON requests


mongoose.connect("mongodb://localhost:27017/shoppy") // Use lowercase for DB name
    .then(() => console.log("DB connection successful"))
    .catch((err) => console.error("Error in DB connection:", err));

// Register Routes
productRoutes(app);
cartRoutes(app);
authRoutes(app)

// Global Error Handling Middleware (should come after routes)
app.use((err, req, res, next) => {
    console.error("Error:", err.stack);
    res.status(500).json({ message: "Internal Server Error" });
});

// Start the server
const PORT = 3000;
app.listen(PORT, () => {
    console.log(` Server running on http://localhost:${PORT}`);
});




