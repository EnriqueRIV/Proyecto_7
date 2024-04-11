const express = require('express');
const {
  register,
  login,
  deleteUser,
  getUsers,
  updateUser
} = require('../controllers/user');
const { isAuth } = require('../../middlewares/auth');
const { isAdmin } = require('../../middlewares/isadmin');

//Rutas para usuarios, todos pueden registrarse e intentar loguearse, solo los usuarios con login pueden actualizar y solo el administrador puede ver a todos los usuarios y eliminar el usuario por el ID
const usersRoutes = express.Router();

usersRoutes.get('/', [isAdmin], getUsers);
usersRoutes.post('/register', register);
usersRoutes.post('/login', login);
usersRoutes.delete('/delete/:id', [isAdmin], deleteUser);
usersRoutes.put('/edit/:id', [isAuth], updateUser);

module.exports = usersRoutes;
