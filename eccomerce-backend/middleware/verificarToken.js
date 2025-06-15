const jwt = require('jsonwebtoken');


// funcion para verificar si el token se está generadon de lo contrario indica que no se ha proporcionado
function verificarToken(req, res, next) {
  const authHeader = req.headers.authorization; // Obtener el encabezado de autorización
  const token = authHeader && authHeader.split(' ')[1]; 

  if (!token) {
    return res.status(401).json({ message: 'Token no proporcionado' });
  }

  try {
    const userData = jwt.verify(token, process.env.JWT_SECRET);
    req.user = userData; 
    next();
  } catch (err) {
    return res.status(403).json({ message: 'Token inválido' });
  }
}

module.exports = verificarToken;