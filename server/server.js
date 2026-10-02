import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import connectDB from "./config/db.js";
import appointmentRoutes from "./routes/appointmentRoutes.js";
import authRoutes from "./routes/authRoutes.js";

dotenv.config();

const app = express();

const PORT = process.env.PORT || 5000;

//DATABASE 
connectDB();

//MIDDLEWARE
app.use(cors());
app.use(express.json());

//TEST ROUTE
app.get("/", (req, res) => {
    res.json({
        success: true,
        message: "Urban Edge Salon API is running",
    });
});

//TEST POST ROUTE
app.use("/api/appointments", appointmentRoutes);
app.use("/api/auth", authRoutes);


//START SERVER
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});