const Post = require('../models/Post')
const Category = require('../models/Category')
const User = require('../models/User')
const { request, response } = require('express')
const { validationResult, check } = require('express-validator')
const bcrypt = require('bcryptjs')

// Crear post
const createPost = async (req = request, res = response) => {
    try {
        await Promise.all([
            check('name', 'invalid.name').not().isEmpty().run(req),
            check('description', 'invalid.description').not().isEmpty().run(req),
            check('category', 'invalid.category').not().isEmpty().run(req),
            check('author', 'invalid.author').not().isEmpty().run(req),
            check('state', 'invalid.state').not().isEmpty().run(req),
        ])

        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(400).json({ mensaje: errors.array() })
        }

        const existPost = await Post.findOne({ name: req.body.name })
        if (existPost) {
            return res.status(400).send('The post already exists')
        }

        const category = await Category.findOne({ _id: req.body.category })
        const author = await User.findOne({ _id: req.body.author })

        if (!category) {
            return res.status(400).send('Invalid category')
        }

        if (!author) {
            return res.status(400).send('Invalid author')
        }

        let post = new Post()

        post.name = req.body.name
        post.description = req.body.description
        post.category = req.body.category
        post.author = req.body.author
        post.state = req.body.state
        post.creationDate = new Date()
        post.updateDate = new Date()
        
        post = await post.save()

        res.send(post)
    } catch (error) {
        console.log(error)
        res.status(500).send('An error occurred while creating the post')
    }
}

//Listar posts
const listPosts = async (req = request, res = response) => {
    try {
        const posts = await Post.find()
        res.send(posts)
    } catch (error) {
        console.log(error)
        res.status(500).send('An error occured while listing the posts')
    }
}

//Editar post
const editPost = async (req = request, res = response) => {
    try {
        const postId = req.params.postId
        const post = await Post.findById(postId)

        if (!post) {
            return res.status(404).send('Post not found')
        }

        if (req.body.name) post.name = req.body.name
        if (req.body.description) post.description = req.body.description
        if (req.body.category) post.category = req.body.category
        if (req.body.author) post.author = req.body.author
        if (req.body.state) post.state = req.body.state

        post.updateDate = new Date()

        const updatedPost = await post.save()

        res.send(updatedPost)
    } catch (error) {
        console.log(error)
        res.status(500).send('An error occured while editing the post')
    }
}

//Eliminar post
const deletePost = async (req = request, res = response) => {
    try {
        const postId = req.params.postId
        const post = await Post.findById(postId)

        if (!post) {
            return res.status(404).send('Post not found')
        }

        await Post.findByIdAndDelete(postId)

        res.send('Post deleted succesfully')
    } catch (error) {
        console.log(error)
        res.status(500).send('An error occured while deleting the post')
    }
}

module.exports = { createPost, listPosts, editPost, deletePost }