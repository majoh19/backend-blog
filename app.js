const express = require('express')
const app = express()
const cors = require('cors')

const user = require('./routes/user')
const category = require('./routes/category')
const post = require('./routes/post')

app.use(express.json())

app.use('/users', user)
app.use('/categories', category)
app.use('/posts', post)

module.exports = app