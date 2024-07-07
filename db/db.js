
const mysql = require('mysql2/promise');

async function createConnection() {
    try {
        const connection = await mysql.createConnection({
            host: 'localhost',
            user: 'admin',
            password: 'my_SQL321',
            database: 'tienda',
        });
        console.log('Conectado a la base de datos con el ID:', connection.threadId);
        return connection;
    } catch (err) {
        console.error('Error conectando a la base de datos:', err.stack);
        throw err;
    }
}

module.exports = createConnection(); 

