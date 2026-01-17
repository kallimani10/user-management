"use strict";
const express = require("express");
const router = express.Router();
const UserController = require("../controllers/user.controller");

// 🔹 Register User
router.post("/register", UserController.registerUser);

// 🔹 List All Users
router.get("/list", UserController.listUsers);


// 🔹 Update User
router.put("/update/:id", UserController.updateUser);

// 🔹 Delete User (Hard Delete)
router.delete("/delete/:id", UserController.deleteUser);

// 🔹 Login User
router.post("/login", UserController.loginUser);


module.exports = router;
