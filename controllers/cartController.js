const dbPromise = require("../db/db");

//Añadir producto al carrito
const addProductToCart = async (req, res) => {
  const { idUsuario } = req.params;
  const { idProducto, cantidad } = req.body;

  try {
    const db = await dbPromise;
    //Se verifica si el carrito del usuario ya existe
    const [carritoResults] = await db.query("SELECT id FROM carritos WHERE usuario_id = ?",[idUsuario]);

    let idCarrito;
    //Si el carrito existe, se obtiene su id
    if (carritoResults.length > 0) {
      idCarrito = carritoResults[0].id;
    } else {
      //Si no existe, se crea un nuevo carrito
      const [carritoResult] = await db.query("INSERT INTO carritos (usuario_id) VALUES (?)",[idUsuario]);
      idCarrito = carritoResult.insertId; //Se obtiene el id del carrito creado
    }

    //Se agrega el producto al detalle del carrito(tabla carrito_productos)
    await db.query("INSERT INTO carrito_productos (carrito_id,producto_id,cantidad) VALUES (?,?,?)",[idCarrito, idProducto, cantidad]);
    res.status(201).json({ mensaje: "Producto añadido al carrito exitosamente" });

  } catch (error) {
    res.status(500).json({ mensaje: error.message });
  }
};

//------------ EDITAR CANTIDAD DEL PRODUCTO EN EL CARRITO ------------
const editProductQuantity = async (req, res) => {
  const { idUsuario, idProducto } = req.params;
  const { cantidad } = req.body;

  try {
    const db = await dbPromise;

    //Se verifica si el carrito del usuario ya existe
    const [carritoResults] = await db.query("SELECT id FROM carritos WHERE usuario_id = ?",[idUsuario]);

  
    let idCarrito;
    //Si el carrito existe, se obtiene su id
    if (carritoResults.length > 0) {
      idCarrito = carritoResults[0].id;
    }else{
        res.status(404).json({mensaje:'El carrito no existe'});
    }

    //Verificar si el producto está en el carrito
    const [detalleResults] = await db.query('SELECT id FROM carrito_productos WHERE carrito_id = ? AND producto_id = ?',[idCarrito,idProducto]);

    //Si el producto esta en el carrito, se actualiza la cantidad
    if(detalleResults.length > 0 ){
        //Se actualiza la cantidad del producto en carrito_productos
        await db.query('UPDATE carrito_productos SET cantidad = ? WHERE carrito_id = ? AND producto_id = ?',[cantidad,idCarrito,idProducto]);
        res.status(200).json({mensaje: 'Cantidad actualizada'});
    }else{
        res.status(404).json({mensaje:'El producto no está en el carrito'});
    }

  } catch (error) {
    res.status(500).json({ mensaje: error.message });
  }
};

//------ ELIMINAR PRODUCTO DEL CARRITO ----------
const deleteProductFromCart = async (req, res) => {
    const { idUsuario, idProducto } = req.params;

    try {
        const db = await dbPromise;
        
        //Se verifica si el carrito del usuario ya existe
        const [carritoResults] = await db.query("SELECT id FROM carritos WHERE usuario_id = ?",[idUsuario]);
        
        let idCarrito;
        //Si el carrito existe, se obtiene su id
        if (carritoResults.length > 0) {
            idCarrito = carritoResults[0].id;
        }else{
            res.status(404).json({mensaje:'El carrito no existe'});
        }

        //Eliminar el producto del carrito
        await db.query('DELETE FROM carrito_productos WHERE carrito_id = ? AND producto_id = ?',[idCarrito,idProducto]);
        res.status(200).json({mensaje:'Producto eliminado del carrito exitosamente'});
        
    } catch (error) {
        res.status(500).json({ mensaje: error.message });   
    }
}

module.exports = { addProductToCart,editProductQuantity, deleteProductFromCart};
