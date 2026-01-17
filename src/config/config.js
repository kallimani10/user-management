if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const CONFIG = {};   

// App
CONFIG.app = process.env.APP || "dev";
CONFIG.port = process.env.PORT || 5000;

// Database
CONFIG.db_dialect = process.env.DB_DIALECT || "postgres";
CONFIG.db_host = process.env.DB_HOST || "localhost";
CONFIG.db_port = process.env.DB_PORT || 5432;
CONFIG.db_name = process.env.DB_NAME || "newdb";
CONFIG.db_user = process.env.DB_USER || "postgres";
CONFIG.db_password = process.env.DB_PASSWORD || "";
CONFIG.db_usePassword =
  (process.env.DB_USE_PASSWORD || "true") === "true";

// JWT
CONFIG.jwtSecret = process.env.JWT_SECRET || "jwt_secret";

module.exports = CONFIG;
