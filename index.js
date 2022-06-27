require('dotenv').config();

const express = require('express');
const cors = require('cors');
const app = express();
const connectDB = require('./configs/configs.js');

connectDB();

const userRouter = require('./routes/users');
const todoRouter = require('./routes/todos');
app.use(express.urlencoded( {extended: true }));
app.use(cors());


app.use('/', userRouter);
app.use('/dotions', todoRouter);
app.get('/helo', (req, res) => {
    res.send("Hello")
})

const PORT = process.PORT || 3000;
app.listen(3000, ()=>{
    console.log('Listen on port ', PORT);
})