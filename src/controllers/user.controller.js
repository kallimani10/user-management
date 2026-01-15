const userService = require("../services/user.service");
const userModel = require("../models/user.model");

exports.register = async (req, res) => {
  try {
    const result = await userService.registerUser(req.body);
    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.login = async (req, res) => {
  try {
    const token = await userService.loginUser(
      req.body.email,
      req.body.password
    );
    res.json(token);
  } catch (err) {
    res.status(401).json({ message: err.message });
  }
};

exports.getUsers = async (req, res) => {
  const users = await userModel.getAllUsers();
  res.json(users.rows);
};

exports.updateUser = async (req, res) => {
  const user = await userModel.updateUser(
    req.params.id,
    req.body.name
  );
  res.json(user.rows[0]);
};

exports.deleteUser = async (req, res) => {
  await userModel.deleteUser(req.params.id);
  res.json({ message: "User deleted" });
};
