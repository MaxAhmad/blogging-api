const express = require('express')

const blogController = require('./../Controllers/blogController')

const blogRoute = express.Router()


blogRoute.post('/', blogController.createBlogPost)

blogRoute.get('/:id', blogController.getBlogPost)

blogRoute.get('/', blogController.getAllBlogPost)

blogRoute.patch('/:id', blogController.updateBlog)

blogRoute.delete('/:id', blogController.deleteBlog)


module.exports = blogRoute




