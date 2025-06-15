const db = require('../db');
// Crear un producto
const crearProducto = async (req, res) => {
  const { name, description, price, image_url, categoria } = req.body;
  try {
    await db.promise().query(
      'INSERT INTO products (name, description, price, image_url, categoria) VALUES (?, ?, ?, ?, ?)',
      [name, description, price, image_url, categoria]
    );
    res.status(201).json({ message: 'Producto creado correctamente' });
  } catch (error) {
    console.error('Error al crear producto:', error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
};

// Obtener todos los productos (con filtros por nombre y categoría)
const obtenerProductos = async (req, res) => {
  try {
    const { name, categoria } = req.query;
    let query = 'SELECT * FROM products';
    const params = [];
    const conditions = [];

    if (name) {
      conditions.push('name LIKE ?');
      params.push(`%${name}%`);
    }
    if (categoria) {
      conditions.push('categoria = ?');
      params.push(categoria);
    }
    if (conditions.length > 0) {
      query += ' WHERE ' + conditions.join(' AND ');
    }

    const [productos] = await db.promise().query(query, params);
    res.json(productos);
  } catch (error) {
    console.error('Error al obtener productos:', error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
};

// Actualizar un producto
const actualizarProducto = async (req, res) => {
  const { id } = req.params;
  const { name, description, price, image_url, categoria } = req.body;
  try {
    await db.promise().query(
      'UPDATE products SET name=?, description=?, price=?, image_url=?, categoria=? WHERE id=?',
      [name, description, price, image_url, categoria, id]
    );
    res.json({ message: 'Producto actualizado correctamente' });
  } catch (error) {
    console.error('Error al actualizar producto:', error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
};

// Eliminar un producto
const eliminarProducto = async (req, res) => {
  const { id } = req.params;
  try {
    await db.promise().query('DELETE FROM products WHERE id = ?', [id]);
    res.json({ message: 'Producto eliminado correctamente' });
  } catch (error) {
    console.error('Error al eliminar producto:', error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
};

module.exports = {
  crearProducto,
  obtenerProductos,
  actualizarProducto,
  eliminarProducto,
};
