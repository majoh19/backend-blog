const { Schema, model } = require('mongoose')

const userSchema = Schema({
    name: {
        type: String,
        required: true,
        minlength: 3
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        minlength: 6
    },
    creationDate: {
        type: Date,
        required: true
    },
    updateDate: {
        type: Date,
        required: true
    }
})

module.exports = model('User', userSchema)