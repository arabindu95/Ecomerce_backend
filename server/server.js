import cookieParser from "cookie-parser";
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connect } from "mongoose";
import connectDB from "./config/connectDB.js";
import userRouter from "./routes/userRoutes.js";
import SellerRouter from "./routes/sellerRoutes.js";
import connectCloudinary from "./config/cloudinary.js";
import productRoutes from "./routes/productRoutes.js";
import cartRouter from "./routes/cartrRoutes.js";
import addressRouter from "./routes/addressRoutes.js";
import orderRouter from "./routes/orderRoutes.js";

console.log("ENV TEST", process.env.CLOUDINARY_CLOUD_NAME);

dotenv.config();
const app = express();
const port = process.env.PORT || 5000;

// Allowed Multiple Origins
const allowedOrigins = [
  "http://localhost:5173",
  "https://visionary-florentine-e4ed9a.netlify.app",
];

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
  })
);

app.use(express.json());
app.use(cookieParser());

app.get("/", (req, res) => {
  res.send(`server is properly working brother..i'm ArabinduChakraborty`);
});
app.use("/api/user", userRouter);
app.use("/api/seller", SellerRouter);
app.use("/api/product", productRoutes);
app.use("/api/cart", cartRouter);
app.use("/api/address", addressRouter);
app.use("/api/order", orderRouter);

const startServer = async () => {
  try {
    await connectDB();
    await connectCloudinary();
    app.listen(port, () =>
      console.log(`server is running at http://localhost:${port}`)
    );
  } catch (err) {
    console.log(`failed server`);
  }
};
startServer();
