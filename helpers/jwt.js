const jwt = require('jsonwebtoken')

const generateJWT = (user) => {
    const payload = {
        user: {
            userId: user.userId,
            name: user.name,
            email: user.email
        }
    }

    return jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: '1h'
    })
}

module.exports = { generateJWT }