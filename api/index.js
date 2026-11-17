import "dotenv/config";
import express from "express";
import cors from "cors";
import connectDB from "../src/config/db.js";
import productRoutes from "../src/routes/productRoutes.js";
import { notFound, errorHandler } from "../src/middlewares/errorMiddleware.js";

const app = express();

connectDB();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Api Restfull Operativa y conectada a Atlas DB",
    endpoints: {
      products: "api/products",
    },
  });
});

app.use("/api/products", productRoutes);

app.use(notFound);
app.use(errorHandler);

export default app;
