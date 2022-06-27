const mongoose = require('mongoose');

const todoSchema = mongoose.Schema({
    title: String,
    status: {
        type: String,
        enum: ['Complete', 'In Progress', 'Next Up'],
        default: 'Next Up'
    },
    priority: {
        type: Number,
        min: 0
    }
},  { timestamps: true });

module.exports = mongoose.model('todos', todoSchema)