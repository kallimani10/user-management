const jwt = require("jsonwebtoken");
const CONFIG = require("../config/config");

exports.generateToken = (user) => {
  return jwt.sign(
    { id: user.id, email: user.email },
    CONFIG.jwtSecret,
    { expiresIn: "1d" }
  );
};
     