 const dbPromise = require("../db/db");


//------ LISTAR TODOS LOS PRODUCTOS -------
const getAllProducts = async (req,res) => {
    const sql = 'SELECT * FROM productos';

    try{
        const db= await dbPromise;
        const [products] = await db.query(sql);
        res.status(200).send(products);
    }catch(error){
        res.status(500).send('Error al listar los productos');
    }

}

//------ CREAR UN NUEVO PRODUCTO ------

const createProduct = async (req,res) => {
    const {nombre,descripcion,precio,stock} = req.body;
    const sql = 'INSERT INTO productos (nombre,descripcion,precio,stock) VALUES (?,?,?,?)';
    try{
        const db = await dbPromise; // Conexión a la base de datos
        await db.query(sql, [nombre,descripcion,precio,stock]); // Ejecución de la consulta
        res.status(200).send('Producto creado');
    } catch(error){
        res.status(500).send('Error al crear el producto');
    }
}

module.exports = {getAllProducts,createProduct}; 