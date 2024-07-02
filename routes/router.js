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

//5 exportamos el modulo
module.exports = router;

//6 pasamos a codificar el controlador
