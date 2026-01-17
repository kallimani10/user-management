"use strict";

require("dotenv").config();
const express = require("express");
const models = require("./models");

const app = express();
const PORT = process.env.PORT || 3000;
const NODE_ENV = process.env.NODE_ENV || "development";

app.use(express.json());

// 🔹 Database Bootstrap
(async function bootstrapDB() {
  try {
    await models.sequelize.authenticate();
    console.log("✅ Database connected");

    // 🔧 DEV ONLY — Auto sync tables
    if (NODE_ENV !== "production") {
      await models.sequelize.sync({ alter: true });
      console.log("🛠️ Tables synced (DEV MODE)");
    }
  } catch (error) {
    console.error("❌ Database connection failed:", error.message);
    process.exit(1);
  }
})();

// 🔹 Routes
const userRoutes = require("./routes/user.routes");
app.use("/api/users", userRoutes);

// 🔹 Health Check
app.get("/health", (req, res) => {
  res.json({
    status: "OK",
    database: "connected",
    env: NODE_ENV,
  });
});

// 🔹 Graceful Shutdown
const shutdown = async (signal) => {
  console.log(`\n🛑 Received ${signal}. Closing server...`);
  try {
    await models.sequelize.close();
    console.log("✅ Database connection closed");
    process.exit(0);
  } catch (err) {
    console.error("❌ Error closing DB connection:", err.message);
    process.exit(1);
  }
};

process.on("SIGINT", shutdown);
process.on("SIGTERM", shutdown);

// 🔹 Start Server
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
