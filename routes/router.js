/**
 * Enrutador 
 * Endpoints
 */

// router.js
const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const productController = require('../controllers/productController');
const cartController = require('../controllers/cartController');

// Planteamos las solicitudes de los endpoints

//------ USUARIOS ------
//registro de usuario
router.post("/register", userController.registerUser);

//login de usuario
router.post("/login", userController.loginUser);

//editar nombre de usuario
router.put("/edit", userController.editUser);

//eliminar usuario
router.delete("/delete", userController.deleteUser);

//listar todos los usuarios
router.get("/list", userController.listUsers);


//------PRODUCTOS--------
//GET - Listar productos
router.get("/productos",productController.getAllProducts);

//POST - Crear producto
router.post("/createProduct",productController.createProduct);



/* ----------CARRITO------------ */
//POST - Añadir producto al carrito
router.post("/usuarios/:idUsuario/carrito",cartController.addProductToCart);

//PUT - Editar cantidad de productos del carrito
router.put("/usuarios/:idUsuario/carrito/:idProducto",cartController.editProductQuantity);

//DELETE - Eliminar producto del carrito
router.delete("/usuarios/:idUsuario/carrito/:idProducto",cartController.deleteProductFromCart);


//5 exportamos el modulo
module.exports = router;