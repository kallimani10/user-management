require("dotenv").config();
const express = require("express");
const { connectDB } = require("./config/db"); // ✅ FIXED PATH

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// connect DB
connectDB();

// health check route
app.get("/health", (req, res) => {
  res.json({
    status: "OK",
    database: "connected",
  });
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
