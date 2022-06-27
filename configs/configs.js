const mongoose = require('mongoose');

const connectDB = () => {
    mongoose
        .connect('mongodb://localhost:27017/todos',
        {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
        .then(()=>
        {
            console.log('Connect db sucess');
        })
        .catch(e => {
            console.log('Conect db err ', e);
        })
}
module.exports = connectDB;