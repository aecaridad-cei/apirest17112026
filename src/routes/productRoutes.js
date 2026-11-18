import express from "express";
<<<<<<< HEAD
import { getAllProducts, getProductById, createProduct, updateProduct, deleteProduct } from "../controller/productController.js";

const router = express.Router();

=======
import {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
} from "../controllers/productController.js";

const router = express.Router();

// Al montarse en /api/products, "/" corresponde a /api/products y "/:id"
// captura el identificador enviado en la URL.
>>>>>>> b4d6ebd8e35972e6cebcb49dd468edabdf56d3e0
router.get("/", getAllProducts);
router.get("/:id", getProductById);
router.post("/", createProduct);
router.put("/:id", updateProduct);
router.delete("/:id", deleteProduct);

<<<<<<< HEAD
export default router;
=======
// Exportación por defecto: el archivo principal importa este router y lo monta en /api/products.
export default router;
>>>>>>> b4d6ebd8e35972e6cebcb49dd468edabdf56d3e0
