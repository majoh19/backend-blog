const { Schema, model } = require('mongoose')

const categorySchema = Schema({
    name: {
        type: String,
        required: true,
        maxlength: 100,
        unique: true
    },
    description: {
        type: String,
        required: true
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

module.exports = model( 'Category', categorySchema )