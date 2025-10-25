const express = require("express");
const cors = require("cors");
const path = require("path");
const userRoutes = require("./routes/userRoutes");

require("dotenv").config();
const app = express();
app.use(cors());
app.use(express.json());

app.use(express.static(path.join(__dirname, "public")));

app.use("/api/users", userRoutes);

app.get("/health", (_req, res) => res.json({ status: "ok" }));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

const { testConnection, initializeDatabase } = require("./utils/database");
const config = require("./config");
const PORT = config.server.port;

(async () => {
  try {
    const isConnected = await testConnection();
    if (!isConnected) {
      console.error("Failed to connect to MySQL database");
      process.exit(1);
    }

    const dbInitialized = await initializeDatabase();
    if (!dbInitialized) {
      console.error("Failed to initialize database");
      process.exit(1);
    }

    if (config.seed.enabled) {
      console.log("Seeding initial data...");
      const { seedInitialData } = require("./utils/seed");
      await seedInitialData();
    }

    app.listen(PORT, () => console.log(`Backend running on port ${PORT}`));
  } catch (error) {
    console.error("Server startup failed:", error.message);
    process.exit(1);
  }
})();
