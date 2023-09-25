const { Router } = require('express')
const { createUser, listUser, editUser, deleteUser } = require('../controllers/user')
const router = Router()

//Crear usuario
router.post('/', createUser)
//Listar usuarios
router.get('/', listUser)
//Editar usuario
router.put('/:userId', editUser)
//Eliminar usuario
router.delete('/:userId', deleteUser)

module.exports = router