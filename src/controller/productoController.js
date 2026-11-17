import Product from "../models/Product";

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

      res.status(200).json({
        success: true,
        data: product,
      });
    }
  } catch (error) {
    next(error);
  }
};

// POST /api/products crea un producto con los datos enviados en el body de JSON{

const createProduct = async (req, res, next) => {
    try {
        const newProduct = await Product.create(req.body)
        res.status(201).json({
            succes: true,
            message: "Producto creado con exito",
            data: newProduct
        })
    } catch (error) {
        next(error)
    }
}

// PUT /api/product/:id actualiza los campos enviados y devuelve el documento nuevo

const updateProduct = async (req, rest, next) => {
    try {
        const updateProduct = await Product.findByIdAndUpdate(
            req.params.id,
            req.body,
            {new: true, runValidators: true}
        )
        if(!updateProduct){
            return res.status(404).json({
                success: false,
                message: "No se pudo actualizar el producto: Producto no encontrado"
            })
            res.status(200).json({
                success: true,
                message: "Producto actualizado correctamente",
                data: updateProduct
            })
        }
    } catch (error) {
        next(error)
    }
}

//  DELETE /api/product/:id elminimqa el producto y devuelve el documento eliminado

const deleteProduct = async (req, res, next) => {
    try {
        const deleteProduct = await Product.findByIdAndDelete(req.params.id)

        if(!deleteProduct){
            return res.status(404).json({
                success: false,
                message: "No se pudo eliminar el producto: Producto no encontrado"
            })
        }
        res.status(200).json({
            success: true,
            message: "Producto eliminado correctamente",
            data: deleteProduct
            })
        } catch (error) {
            next(error)
        }
}
