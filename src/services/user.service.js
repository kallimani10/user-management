const userModel = require("../models/user.model");
const { hashPassword, comparePassword } = require("../utils/hash");
const { generateToken } = require("../utils/token");

exports.registerUser = async (data) => {
  const existing = await userModel.findByEmail(data.email);
  if (existing.rows.length > 0) {
    throw new Error("User already exists");
  }

  const hashedPassword = await hashPassword(data.password);
  return await userModel.createUser(
    data.name,
    data.email,
    hashedPassword
  );
};

exports.loginUser = async (email, password) => {
  const result = await userModel.findByEmail(email);
  const user = result.rows[0];

  if (!user) throw new Error("User not found");

  const match = await comparePassword(password, user.password);
  if (!match) throw new Error("Invalid credentials");

  const token = generateToken(user);
  return { token };
};
