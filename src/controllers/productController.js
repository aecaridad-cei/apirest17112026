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

// POST /api/products crea un producto con los datos enviados en el cuerpo de JSON
const createProduct = async (req, res, next) => {
  try {
    const newProduct = await Product.create(req.body);
    res.status(201).json({
      success: true,
      message: "Producto Creado con exito",
      data: newProduct,
    });
  } catch (error) {
    next(error);
  }
};

// PUT /api/product/:id actualiza los campos enviados y devuelve el documento nuevo
const updateProduct = async (req, res, next) => {
  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true },
      // Devuelve el objeto actualizado y aplica validaciones del esquema
    );
    if (!updatedProduct) {
      return res.status(404).json({
        success: false,
        message: "No se pudo actualizar: Producto no encontrado",
      });
    }
    res.status(200).json({
      success: true,
      message: "Producto actualizado correctamente",
      data: updatedProduct,
    });
  } catch (error) {
    next(error);
  }
};

// DELETE /api/products/:id elimina el producto y devuelve el docuemento eliminado
const deleteProduct = async (req, res, next) => {
  try {
    const deletedProduct = await Product.findByIdAndDelete(req.params.id);

    if (!deletedProduct) {
      return res.status(404).json({
        success: false,
        message: "No se pudo eliminar: Producto no encontrado",
      });
    }

    res.status(200).json({
      success: true,
      message: "Producto eliminado correctamente",
      data: deletedProduct,
    });
  } catch (error) {}
};

// Exportaciones con nombre: el router importa explicitamente cada controlador que utiliza.
export {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
};
