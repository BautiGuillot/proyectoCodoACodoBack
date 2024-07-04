/**
 * Enrutador 
 * Endpoints
 */

// router.js
const express = require('express');
const router = express.Router();
const tiendaController = require('../controllers/controllers');

//4 planteamos las solicitudes de los endpoints

//registro de usuario
router.post("/register", tiendaController.registerUser);

//login de usuario
router.post("/login", tiendaController.loginUser);

//editar nombre de usuario
router.put("/edit", tiendaController.editUser);

//eliminar usuario
router.delete("/delete", tiendaController.deleteUser);

//listar todos los usuarios
router.get("/list", tiendaController.listUsers);

//5 exportamos el modulo
module.exports = router;

//6 pasamos a codificar el controlador
