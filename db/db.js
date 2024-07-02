const mysql = require('mysql2/promise');

async function createConnection() {
    try {
        const connection = await mysql.createConnection({
            host: 'localhost',
            user: 'root',
            password: '1234',
            database: 'tienda'
        });
        console.log('Conectado a la base de datos con el ID:', connection.threadId);
        return connection;
    } catch (err) {
        console.error('Error conectando a la base de datos:', err.stack);
        throw err; // Propagar el error para manejarlo más arriba si es necesario
    }
}

module.exports = createConnection();