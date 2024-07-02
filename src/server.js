const express = require('express');
const app = express();
const router = require('../routes/router');

app.use(express.json());
app.use('/tienda', router); // Ajusta la ruta base si es necesario

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en puerto ${PORT}`);
});