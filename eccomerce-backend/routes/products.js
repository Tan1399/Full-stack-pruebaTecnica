const express = require('express');
const router = express.Router();
const verificarToken = require('../middleware/verificarToken');
const verificarRol = require('../middleware/verificarRol');
const {
  crearProducto,
  obtenerProductos,
  actualizarProducto,
  eliminarProducto,
} = require('../controllers/products.controller');

// Crear producto (solo admin)
router.post('/products', verificarToken, verificarRol(['admin']), crearProducto);

// Editar producto (solo admin)
router.put('/:id', verificarToken, verificarRol(['admin']), actualizarProducto);

// Eliminar producto (solo admin)
router.delete('/:id', verificarToken, verificarRol(['admin']), eliminarProducto);

// Vista pública (todos pueden ver)
router.get('/', obtenerProductos);

module.exports = router;