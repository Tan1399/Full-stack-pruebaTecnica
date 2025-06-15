

const express = require('express');
const router = express.Router();
const { register, login } = require('../controllers/auth.controller');


// rutas de autenticación
router.post('/register', register);
router.post('/login', login);
//router.post('/logout', logout);



module.exports = router;