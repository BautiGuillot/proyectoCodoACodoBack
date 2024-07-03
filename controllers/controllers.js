const dbPromise = require('../db/db'); 

const registerUser = async (req, res) => {
    const { nombre, email, password } = req.body;
    const query = `INSERT INTO usuarios (nombre, email, password) VALUES (?, ?, ?)`;
    try {
        const db = await dbPromise; // Conexión a la base de datos
        await db.query(query, [nombre, email, password]); // Ejecución de la consulta
        res.status(200).send('Usuario registrado');
    } catch (error) {
        res.status(500).send('Error al registrar el usuario');
    }
}

const loginUser = async (req, res) => {
    const { email, password } = req.body;
    const query = `SELECT * FROM usuarios WHERE email = ? AND password = ?`;
    try {
        const db = await dbPromise;
        const [user] = await db.query(query, [email, password]);
        if (user.length > 0) {
            res.status(200).send('Usuario logueado');
        } else {
            res.status(400).send('Usuario no encontrado');
        }
    } catch (error) {
        res.status(500).send('Error al loguear el usuario');
    }
}

//para un email cambiar el nombre de usuario
const editUser = async (req, res) => {
    const { nombre, email } = req.body;
    const query = `UPDATE usuarios SET nombre = ? WHERE email = ?`;
    try {
        const db = await dbPromise;
        await db.query(query, [nombre, email]);
        res.status(200).send('Nombre de usuario actualizado');
    } catch (error) {
        res.status(500).send('Error al actualizar el nombre de usuario');
    }
}

//eliminar usuario
const deleteUser = async (req, res) => {
    const { email } = req.body;
    const query = `DELETE FROM usuarios WHERE email = ?`;
    try {
        const db = await dbPromise;
        await db.query(query, [email]);
        res.status(200).send('Usuario eliminado');
    } catch (error) {
        res.status(500).send('Error al eliminar el usuario');
    }
}


module.exports = {
    registerUser,
    loginUser,
    editUser,
    deleteUser
};