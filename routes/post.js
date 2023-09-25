const { Router } = require('express')
const { createPost, listPosts, editPost, deletePost } = require('../controllers/post')
const router = Router()

//Crear usuario
router.post('/', createPost)
//Listar usuarios
router.get('/', listPosts)
//Editar usuario
router.put('/:postId', editPost)
//Eliminar usuario
router.delete('/:postId', deletePost)

module.exports = router