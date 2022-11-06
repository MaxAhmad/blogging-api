const slug = require('slugify')
const Blog = require('../Models/blogModel')

exports.getOverview = async (req, res) => {
    const blogs = await Blog.find()
    res.status(200).render('overview', {
      title: 'All Post',
      blogs
    })
}

exports.getArticle = async (req, res) => {
    const blog = await Blog.findOne({ slug: req.params.slug })

    //console.log(req.params.slug)
    res.status(200).render('article', {
      title: 'The Camper Series',
      blog
    })
}

exports.getLogin = (req, res) => {
    res.status(200).render('login', {
        title: 'Login'
    })
}

exports.getSignUp = (req, res) => {
    res.status(200).render('signup', {
        title: 'Sign Up'
    })
}

exports.createPost = async (req, res) => {
    const blog = await Blog.create()
    res.status(200).render('create_article', {
        title: 'Create Post',
        blog
    })
}

