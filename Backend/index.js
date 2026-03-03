import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./utils/db.js";
import userRoutes from "./routes/user.route.js";
import companyRoutes from "./routes/company.route.js";
import jobRoutes from "./routes/job.route.js";
import applicationRoutes from "./routes/application.route.js";
dotenv.config({});

const app = express();
/* app.get("/home", (req, res) => {
  return res.status(200).json({
    message: "Welcome to Job Portal Backend!",
    success: true,
  });
}); */

//MIDDLEWARE

app.use(express.json());
//It allows your server to read incoming request bodies that are in JSON format.
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser()); //req.cookies
const corsOptions = {
  origin: "http://localhost:5173",
  credentials: true,
};

/* Defines CORS options:
origin → Only allow requests from http://localhost:5173 (your front-end server).
credentials: true → Allow sending cookies or authentication headers along with requests.
 */
app.use(cors(corsOptions));

//ROUTES
app.use("/api/v1/users", userRoutes);
app.use("/api/v1/companies", companyRoutes);
app.use("/api/v1/jobs", jobRoutes);
app.use("/api/v1/applications", applicationRoutes);
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  connectDB();
  console.log(`Server is running on port ${PORT}`);
});
