"use strict";

const bcrypt = require("bcrypt");
const { ReE, ReS } = require("../utils/response");
const model = require("../models");

const registerUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Required fields check
    if (!username || !email || !password) {
      return ReE(res, "username, email and password are required", 400);
    }

    const normalizedEmail = email.trim().toLowerCase();
    const normalizedUsername = username.trim();

    // Check if email exists
    const existingUser = await model.PracticeUser.findOne({
      where: { email: normalizedEmail, isDeleted: false },
    });

    if (existingUser) {
      return ReE(res, "User with this email already exists", 409);
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const user = await model.PracticeUser.create({
      username: normalizedUsername,
      email: normalizedEmail,
      password: hashedPassword,
    });

    return ReS(res, { success: true, userId: user.id }, 201);
  } catch (error) {
    console.error("Register User Error:", error);
    return ReE(res, error.message, 500);
  }
};

module.exports.registerUser = registerUser;


const listUsers = async (req, res) => {
  try {
    const users = await model.PracticeUser.findAll({
      where: { isDeleted: false },
      attributes: { exclude: ["password"] },
      order: [["createdAt", "DESC"]],
    });

    return ReS(res, { success: true, data: users }, 200);
  } catch (error) {
    console.error("List Users Error:", error);
    return ReE(res, error.message, 500);
  }
};

module.exports.listUsers = listUsers;


const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { username, email, password } = req.body;

    const user = await model.PracticeUser.findOne({
      where: { id: id, isDeleted: false },
    });

    if (!user) {
      return ReE(res, "User not found", 404);
    }

    let updatedData = {};

    if (username) updatedData.username = username.trim();
    if (email) updatedData.email = email.trim().toLowerCase();
    if (password) {
      updatedData.password = await bcrypt.hash(password, 10);
    }

    await model.PracticeUser.update(updatedData, {
      where: { id: id },
    });

    return ReS(res, { success: true, message: "User updated successfully" }, 200);
  } catch (error) {
    console.error("Update User Error:", error);
    return ReE(res, error.message, 500);
  }
};

module.exports.updateUser = updateUser;


const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await model.PracticeUser.findOne({
      where: { id: id },
    });

    if (!user) {
      return ReE(res, "User not found", 404);
    }

    await model.PracticeUser.destroy({
      where: { id: id },
    });

    return ReS(res, { success: true, message: "User deleted permanently" }, 200);
  } catch (error) {
    console.error("Delete User Error:", error);
    return ReE(res, error.message, 500);
  }
};

module.exports.deleteUser = deleteUser;

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Required fields check
    if (!email || !password) {
      return ReE(res, "email and password are required", 400);
    }

    const normalizedEmail = email.trim().toLowerCase();

    // Find user
    const user = await model.PracticeUser.findOne({
      where: { email: normalizedEmail },
    });

    if (!user) {
      return ReE(res, "Invalid email or password", 401);
    }

    // Match password (plain check)
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return ReE(res, "Invalid email or password", 401);
    }

    return ReS(
      res,
      {
        success: true,
        message: "Login successful",
        user: {
          id: user.id,
          username: user.username,
          email: user.email,
        },
      },
      200
    );
  } catch (error) {
    console.error("Login User Error:", error);
    return ReE(res, error.message, 500);
  }
};

module.exports.loginUser = loginUser;


