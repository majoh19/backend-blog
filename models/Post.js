const { Schema, model } = require('mongoose')

const postSchema = Schema({
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
    category: {
        type: Schema.Types.ObjectId,
        ref: 'Category',
        required: true
    },
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    state: {
        type: String,
        enum: [ 'post', 'no_post' ],
        default: 'no_post'
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

module.exports = model('Post', postSchema)