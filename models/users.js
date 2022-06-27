const mongoose = require('mongoose');

const userSchema = mongoose.Schema(
    {
        email: {
            type: String,
            require: true,
            match: [
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                'Please provide a valid email',
            ],
            unique: true
        },
        username: {
            type: String,
            unique: true
        },
        salt: {
            type: String
        },
        hash: {
            type: String
        },
        refreshToken: {
            type: String
        }
    }
    , { timestamps: true }
)

module.exports = mongoose.model('users', userSchema);
