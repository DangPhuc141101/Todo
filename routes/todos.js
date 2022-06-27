const express = require('express');
const route = express.Router();
const todoController = require('../controlls/todos');
const verifyToken = require('../middleware/auth');

route.post('/', verifyToken, todoController.createTodo);
route.put('/', verifyToken, todoController.editTodo);
route.get('/', verifyToken, todoController.getTodo);
route.delete('/',verifyToken, todoController.deleteTodo);


module.exports = route;