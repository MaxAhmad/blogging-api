const express = require("express");

const blogController = require("./../Controllers/blogController");
const authController = require("./../Controllers/authController");

const blogRoute = express.Router();

blogRoute.post("/", authController.authorize, blogController.createBlogPost);

blogRoute.get("/:id", blogController.getBlogPost);

blogRoute.get("/search/:searchId", blogController.searchBlog);

blogRoute.get("/", blogController.getAllBlogPost);

blogRoute.patch("/:id", authController.authorize, blogController.updateBlog);

blogRoute.delete("/:id", authController.authorize, blogController.deleteBlog);

module.exports = blogRoute;
