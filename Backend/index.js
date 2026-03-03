import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./utils/db.js";
import userRoutes from "./routes/user.route.js";
import companyRoutes from "./routes/company.route.js";
import jobRoutes from "./routes/job.route.js";
import applicationRoutes from "./routes/application.route.js";

dotenv.config();

const app = express();

// ------------------- MIDDLEWARE -------------------

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Allowed origins (Local + Production)
const allowedOrigins = [
  "http://localhost:5173",
  "https://job-portal-f1nd-git-main-siddhinikam1907s-projects.vercel.app",
  "https://job-portal-f1nd-3t8k842h5-siddhinikam1907s-projects.vercel.app",
];

// Dynamic CORS handling
app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  }),
);

// ------------------- ROUTES -------------------

app.use("/api/v1/users", userRoutes);
app.use("/api/v1/companies", companyRoutes);
app.use("/api/v1/jobs", jobRoutes);
app.use("/api/v1/applications", applicationRoutes);

// ------------------- SERVER -------------------

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  connectDB();
  console.log(`Server is running on port ${PORT}`);
});
