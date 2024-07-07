const express = require('express');
const app = express();
const router = require('../routes/router');

app.use(express.json());
app.use('/tienda', router);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en puerto ${PORT}`);
});