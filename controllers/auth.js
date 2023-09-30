const User = require('../models/User')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const {validationResult, check} = require('express-validator')
const {generateJWT} = require('../helpers/jwt')

//Autenticar usuario
const authenticateUser = async (req = request, res = response) => {
    try {
        await Promise.all([
            check('email', 'invalid.email').isEmail().run(req),
            check('password', 'invalid.password').not().isEmpty().run(req),
        ])

        const errors = validationResult(req)
        if (!errors.isEmpty) {
            return res.status(400).json({ mensaje: errors.array() })
        }

        const { email, password } = req.body

        const user = await User.findOne({ email })
        if (!user) {
            return res.status(400).send('Invalid email or password')
        }

        const isPasswordValid = await bcrypt.compare(password, user.password)
        if (!isPasswordValid) {
            return res.status(500).send('Invalid email or password')
        }

        const token = generateJWT(user)

        res.json({
            user: {
                userId: user.userId,
                name: user.name,
                email: user.email
            },
            access_token: token,
        })
    } catch (error) {
        console.error(error)
        res.status(500).send('An error occured while authenticating the user')
    }
}

module.exports = { authenticateUser }