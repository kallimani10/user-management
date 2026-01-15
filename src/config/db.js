const { Pool } = require("pg");
const CONFIG = require("./config");

const pool = new Pool({
  host: CONFIG.db_host,
  user: CONFIG.db_user,
  password: CONFIG.db_usePassword ? CONFIG.db_password : undefined,
  database: CONFIG.db_name,
  port: CONFIG.db_port,
});

pool.on("connect", () => {
  console.log("✅ PostgreSQL connected");
});

pool.on("error", (err) => {
  console.error("❌ PostgreSQL error:", err.message);
});

module.exports = pool;
