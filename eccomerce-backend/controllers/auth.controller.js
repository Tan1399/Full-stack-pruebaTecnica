const db = require('../db');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// REGISTRO
const register = async (req, res) => {
  const { name, email, password, rol = 'user' } = req.body;

  try {
    if (!name || !email || !password) {
      return res.status(400).json({ message: 'Todos los campos son obligatorios' });
    }

    // Verifica si ya existe
    const [existe] = await db.promise().query('SELECT * FROM users WHERE email = ?', [email]);
    if (existe.length > 0) {
      return res.status(400).json({ message: 'Correo ya registrado' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await db.promise().query(
      'INSERT INTO users (name, email, password, rol) VALUES (?, ?, ?, ?)',
      [name, email, hashedPassword, rol]
    );

    // Obtener el usuario recién creado para generar el token
    const [nuevoUsuario] = await db.promise().query('SELECT * FROM users WHERE email = ?', [email]);
    const token = jwt.sign(
      { id: nuevoUsuario[0].id, rol: nuevoUsuario[0].rol },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    res.status(201).json({
      message: 'Usuario registrado correctamente',
      token,
      user: { id: nuevoUsuario[0].id, name: nuevoUsuario[0].name, rol: nuevoUsuario[0].rol }
    });
  } catch (error) {
    console.error('Error en el registro:', error);
    res.status(500).json({ message: 'Error en el registro' });
  }
};

// LOGIN
const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Todos los campos son obligatorios' });
  }

  try {
    const [user] = await db.promise().query('SELECT * FROM users WHERE email = ?', [email]);

    if (user.length === 0) {
      return res.status(400).json({ message: 'Usuario no encontrado' });
    }

    const isMatch = await bcrypt.compare(password, user[0].password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Contraseña incorrecta' });
    }

    const token = jwt.sign(
      { id: user[0].id, rol: user[0].rol },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    res.status(200).json({
      message: 'Inicio de sesión exitoso',
      token,
      user: { id: user[0].id, name: user[0].name, rol: user[0].rol }
    });
  } catch (error) {
    console.error('Error en el inicio de sesión:', error);
    res.status(500).json({ message: 'Error en el inicio de sesión' });
  }
};

module.exports = { register, login };

