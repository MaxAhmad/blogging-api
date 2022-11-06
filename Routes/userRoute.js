const express = require("express");

const userController = require("./../Controllers/userController");

const authController = require("./../Controllers/authController");

const userRoute = express.Router();

userRoute.post("/signup", authController.signup);

userRoute.post("/login", authController.login);

userRoute.get("/logout", authController.logout);

userRoute.post("/", userController.createUser);

userRoute.get("/:id", userController.getUser);

userRoute.get("/", userController.getAllUser);

userRoute.patch("/:id", userController.updateUser);

userRoute.delete("/:id", userController.deleteUser);

module.exports = userRoute;
