const app = require("./app");
const CONFIG = require("./config/config");

app.listen(CONFIG.port, () => {
  console.log(`🚀 Server running on port ${CONFIG.port}`);
});
