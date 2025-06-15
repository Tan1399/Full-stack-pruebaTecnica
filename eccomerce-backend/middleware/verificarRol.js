
// función que se encarga de verificar los roles permitidos
function verificarRol(rolesPermitidos) {
  return (req, res, next) => {
    if (!rolesPermitidos.includes(req.user.rol)) {
      return res.status(403).json({ message: 'Acceso denegado: rol insuficiente' });
    }
    next();
  };
}

module.exports = verificarRol;