const express = require('express')
const app = express()
const cors = require('cors')

app.use(cors())

const user = require('./routes/user')
const category = require('./routes/category')
const post = require('./routes/post')
const auth = require('./routes/auth')

app.use(express.json())

app.use('/users', user)
app.use('/categories', category)
app.use('/posts', post)
app.use('/auth', auth)

module.exports = app