import "dotenv/config"
import express from "express"
import cors from "cors"
import connectDB from "./config/db.js"
import productRoutes from "./routes/productRoutes.js"
import { notFound, errorHandler } from "./middleware/errorMiddleware.js"

const app = express()

connectDB()

app.use(cors())
app.use(express.json())

app.get("/", (req, res) => {
    res.status(200).json({
        success: true,
        message: "Api Restfull Operativa y conectada a MongoDB Atlas",
        endpoint: { products: "/api/products" }
    })
})

app.use("/api/products", productRoutes)

app.use(notFound)
app.use(errorHandler)

const PORT = process.env.PORT || 3000
if (process.env.NODE_ENV !== "production") {
    app.listen(PORT, () => {
        console.log('Servidor ejecutandose en localhost')
    })
}