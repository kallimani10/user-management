// ===============================
// Database (PostgreSQL)
// ===============================
if (process.env.NODE_ENV !== "production") {
  require("dotenv").config(); // Load .env only in non-production
}

let CONFIG = {};
CONFIG.db_dialect = process.env.DB_DIALECT || "postgres";
CONFIG.db_host = process.env.DB_HOST || "localhost";
CONFIG.db_port = process.env.DB_PORT || 5432;
CONFIG.db_name = process.env.DB_NAME || "user_management";
CONFIG.db_user = process.env.DB_USER || "postgres";
CONFIG.db_password = process.env.DB_PASSWORD || "";
CONFIG.db_usePassword =
  (process.env.DB_USE_PASSWORD || "true") === "true";