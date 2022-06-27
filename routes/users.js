const express = require('express');
const route = express.Router();
const  verifyToken  = require('../middleware/auth');
const userController = require('../controlls/users');

route.post('/register', userController.createUser)

route.post('/login', userController.login)

route.post('/logout', verifyToken, userController.logout)

route.post('/token', verifyToken, userController.getToken)

module.exports = route;