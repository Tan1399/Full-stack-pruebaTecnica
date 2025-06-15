const express = require('express');
const cors = require('cors');
require('dotenv').config();
const verficarToken = require('./middleware/verificarToken');
const verificarRol= require('./middleware/verificarRol');

const app= express();
const port =  4000;

const db = require('./db'); // Importar la conexión a la base de datos
app.use(cors());
app.use(express.json()); // Middleware para parsear JSON

app.get('/', (req, res) => {
    res.send('servidor funcionando');
    }
);


// identificar el puerto
app.listen(port, () => {
    console.log(`Servidor backend en el puerto ${port}`);
});

const authRoutes = require('./routes/auth.routes'); //Importar las rutas de autenticación
app.use('/api/auth', authRoutes); // Usar las rutas de autenticación

const productsRoutes = require('./routes/products'); // Importar las rutas de productos
app.use('/api/products', productsRoutes); // Usar las rutas de productos


// Ruta protegida de ejemplo para verificar el middleware de autenticación y autorización
// app.post('/api/products', verficarToken, verificarRol(['admin']), (req, res) => {
//     res.json({ message: 'Acceso concedido a la ruta protegida', user: req.user });
// });