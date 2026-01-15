const jwt = require("jsonwebtoken");
const CONFIG = require("../config/config");

module.exports = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader)
    return res.status(401).json({ message: "No token" });

  const token = authHeader.split(" ")[1];

  jwt.verify(token, CONFIG.jwtSecret, (err, user) => {
    if (err)
      return res.status(403).json({ message: "Invalid token" });

    req.user = user;
    next();
  });
};
