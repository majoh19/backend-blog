const { Router } = require('express')
const { authenticateUser } = require('../controllers/auth')
const router = Router()

router.post('/', authenticateUser)

module.exports = router