import express from "express";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/database.js";
import userRoute from "./routes/auth.route.js";
import activityRoute from "./routes/activity.route.js";

dotenv.config({});

const app = express();

app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
  }));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

const PORT = process.env.PORT || 3000;

app.use("/user", userRoute);
app.use("/activities", activityRoute);

app.get("/", (req, res) => {
  res.send("Activity Booking API is running");
});

app.use("*", (req, res) => {
    res.status(404).json({ message: "Route not found", success: false });
  });

const startServer = async () => {
  try {
    await connectDB();
    console.log("Database Connected");

    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (err) {
    console.error("Error connecting Database:", err.message);
    process.exit(1);
  }
};

startServer();
