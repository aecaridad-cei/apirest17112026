// Cargar el .env al importar este modulo, antes de leer MONGODBGUIR
import "dotenv/config";
import express from "express";
import cors from "cors";
import connectDB from "./src/config/db.js";
import productRoutes from "./src/routes/productRoutes.js";
import { notFound, errorHandler } from "./src/middlewares/errorMiddleware";

// Crear la aplicacion de express; en este archivo se conectan sus piezas principales
const app = express();

// Inicio la conexion a la base de datos usando la configuracion del entorno
connectDB();

// Los middlewares procesan cada peticion antes que llegue a una ruta
// CORS permite solicitudes desde otros origenes y express.json interpreta cuerpos json
app.use(cors());
app.use(express.json());

// EndPoint de comprobacion: informa que el servidor is alive.
app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Api Restfull Operativa y conectada a Atlas DB",
    endpoints: {
      products: "api/products",
    },
  });
});

// Todas las rutas de productos queden agrupadas bajo el prefijo /api/products
app.use("/api/products", productRoutes);

// Esto se coloca despues de las rutas: primero detectamos endpoints que no existen
// luego se centraliza el tratamiento de los errores con next(error)
app.use(notFound);
app.use(errorHandler);

// En local o desarrollo, si inician un servidor HTTP usamos el local con puerto o importamos los datos de vercel
const PORT = process.env.PORT || 3000;
if (process.env.NODE_ENV !== "production") {
  app.listen(PORT, () => {
    console.log(`Servidor ejecutandose en localhost`);
  });
}

export default app;
