const db = require("../config/db");

exports.createUser = (name, email, password) => {
  return db.query(
    "INSERT INTO users (name, email, password) VALUES ($1,$2,$3) RETURNING id,name,email",
    [name, email, password]
  );
};

exports.findByEmail = (email) => {
  return db.query("SELECT * FROM users WHERE email=$1", [email]);
};

exports.getAllUsers = () => {
  return db.query("SELECT id,name,email FROM users");
};

exports.updateUser = (id, name) => {
  return db.query(
    "UPDATE users SET name=$1 WHERE id=$2 RETURNING id,name,email",
    [name, id]
  );
};

exports.deleteUser = (id) => {
  return db.query("DELETE FROM users WHERE id=$1", [id]);
};
