import Product from "../models/Product";
import User from "../models/User";

// Los controladores implementan cada operacion HTTP y traducen el resultado en un JSON
// Los errores de mongoose se pasan al middleware central mediante next(error)

// Get /api/products - Obtener todos los productos
const getAllProducts = async (req, res, next) => {
  try {
    const products = await Product.find().sort({ createdAt: -1 });
    res.status(200).json({
      success: true,
      count: products.length,
      data: products,
    });
  } catch (error) {
    next(error);
  }
};

// GET /api/products/:id busca un producto por su identificador
// detalle de un un producto

const getProductById = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Producto no encontrado con ese ID",
      });
    }
    res.status(200).json({
      success: true,
      data: product,
    });
  } catch (error) {
    next(error);
  }
};
