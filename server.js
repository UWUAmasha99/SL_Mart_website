import express from "express";
import colors from "colors";
import dotenv from "dotenv";
import morgan from "morgan";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoute.js";
import categoryRoutes from "./routes/categoryRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import bodyParser from 'body-parser';
import cors from "cors";
import gift_voucher from "./routes/gift_voucher.js"
import feedbackRoutes from "./routes/feedbackRoutes.js";
import ratingRoute from "./routes/ratingRoute.js";



//configure env
dotenv.config();
 
//databse config
connectDB();

//rest object
const app = express();

// Increase the limit for JSON requests to 50 MB
app.use(bodyParser.json({ limit: '50mb' }));

//middelwares
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

//routes
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/category", categoryRoutes);
app.use("/api/v1/product", productRoutes);
app.use("/giftVoucher", gift_voucher);
app.use("/feedback", feedbackRoutes);
app.use("/", ratingRoute);

//rest api
app.get("/", (req, res) => {
  res.send("<h1>Welcome to ecommerce app</h1>");
});

//PORT
const PORT = process.env.PORT || 8080;

//run listen
app.listen(PORT, () => {
  console.log(
    `Server Running on ${process.env.DEV_MODE} mode on port ${PORT}`.bgCyan
      .white
  );
});
