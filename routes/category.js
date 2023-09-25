const { Router } = require('express')
const { createCategory, listCategory, editCategory, deleteCategory } = require('../controllers/category')
const router = Router()

//Crear usuario
router.post('/', createCategory)
//Listar usuarios
router.get('/', listCategory)
//Editar usuario
router.put('/:categoryId', editCategory)
//Eliminar usuario
router.delete('/:categoryId', deleteCategory)

module.exports = router