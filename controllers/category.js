const Category = require('../models/Category')
const { request, response } = require('express')
const { validationResult, check } = require('express-validator')
const bycript = require('bcryptjs')

//Crear categoría
const createCategory = async (req = request, res = response) => {
    try {
        await Promise.all([
            check('name', 'invalid.name').not().isEmpty().run(req),
            check('description', 'invalid.description').not().isEmpty().run(req),
        ])

        const errors = validationResult(req)
        if (!errors.isEmpty) {
            return res.status(400).json({ mensaje: errors.array() })
        }

        const existCategory = await Category.findOne({ name: req.body.name })
        if (existCategory) {
            return res.status(400).send('The category already exists')
        }

        let category = new Category()
        category.name = req.body.name
        category.description = req.body.description

        category.creationDate = new Date()
        category.updateDate = new Date()

        category = await category.save()

        res.send(category)
    } catch (error) {
        console.log(error)
        res.status(500).send('An error occured while creating the category')
    }
}

//Listar categorías
const listCategory = async (req = request, res = response) => {
    try {
        const categories = await Category.find()
        res.send(categories)
    } catch (error) {
        console.log(error)
        res.status(500).send('An error occured while listing the categories')
    }
}

//Editar usuario
const editCategory = async (req = request, res = response) => {
    try {
        const categoryId = req.params.categoryId
        const category = await Category.findById(categoryId)
        if (!category) {
            return res.status(404).send('Category not found')
        }

        if (req.body.name) category.name = req.body.name
        if (req.body.description) category.description = req.body.description

        category.updateDate = new Date()

        const updatedCategory = await category.save()
        res.send(updatedCategory)
    } catch (error) {
        console.log(error)
        res.status(500).send('An error occured while editing the category')
    }
}

//Eliminar categoría
const deleteCategory = async (req = request, res = response) => {
    try {
        const categoryId = req.params.categoryId

        const category = await Category.findById(categoryId)
        if (!category) {
            return res.status(404).send('Category not found')
        }

        await Category.findByIdAndDelete(categoryId)

        res.send('Category deleted successfully')
    } catch (error) {
        console.log(error)
        res.status(500).send('An error occured while deleting the category')
    }
}

module.exports = { createCategory, listCategory, editCategory, deleteCategory }