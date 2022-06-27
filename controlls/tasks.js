const Todo = require('../models/tasks');
const { StatusCodes } = require('http-status-codes');
const {} = require('../errors/index');

module.exports.createTodo = async(req, res) => {
    const {title, status, priority} = req.body;
    try {
        const todo = Todo({title, status, priority});
        await todo.save();
        res.status(StatusCodes.CREATED).json(todo)
    } catch (error) {
        res.status(400).json({message: error})   
    }
}

module.exports.editTodo = async(req, res) => {
    const {title, status, priority} = req.body;
    const {id} = req.params;
    try {
        const todo = Todo.findByIdAndUpdate(id, {title, status, priority});
        await todo.save();
        res.status(StatusCodes.OK).json(todo)
    } catch (error) {
        res.status(400).json({message: error})   
    }
}

module.exports.getTodo = async(_req, res) => {
    const tasks = await Todo.find({});
    res.status(200).json(tasks);
}

module.exports.deleteTodo = async(req, res) => {
    const { id } = req.params;
    try {
        const task = await Todo.findByIdAndDelete(id);
        res.status(StatusCodes.OK).json({message: 'Delete success', success: true})
    } catch (error) {
        res.status(400).json({message: 'Delete fail', success: false})
    }
}