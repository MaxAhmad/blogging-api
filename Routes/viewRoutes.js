const express = require('express')

const router = express.Router()

const viewController = require('../Controllers/viewController')

const authController = require('../Controllers/authController')



router.use(authController.loggedIn)

router.get('/', viewController.getOverview)

router.get('/article/:slug', viewController.getArticle)

router.get('/login', viewController.getLogin)

router.get('/signup', viewController.getSignUp)

router.get('/createPost', viewController.createPost)



module.exports = router