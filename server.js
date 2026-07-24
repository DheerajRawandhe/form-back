import express from "express";
import dotenv from "dotenv";
import cors from "cors";

import connectDB from "./config/db.js";

import authRoutes from "./routes/auth.routes.js";
import surveyRoutes from "./routes/survey.routes.js";
import referralRoutes from "./routes/referral.routes.js";
import rewardRoutes from "./routes/reward.routes.js";
import dashboardRoutes from "./routes/dashboard.routes.js";
import adminRoutes from "./routes/admin.routes.js";
import paymentRoutes from "./routes/payment.routes.js";

dotenv.config();

const app = express();
// const port = process.env.PORT || 5000;

const PORT = process.env.PORT || 5000;

// Database Connection
connectDB();

// Middlewares
// app.use(cors());

app.use(cors({
  origin: ["http://localhost:5173",
    // ,  "https://medhashala-form.vercel.app" ,
    // "https://medhashala-survey-form2.onrender.com" 
  ],
  credentials: true,
}));



app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/survey", surveyRoutes);
app.use("/api/referral", referralRoutes);
app.use("/api/reward", rewardRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/payment", paymentRoutes);

// Home Route
app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "MedhaShala Referral Survey API Running ",
  });
});

// Server Start
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running at http://localhost:${PORT}`);
});