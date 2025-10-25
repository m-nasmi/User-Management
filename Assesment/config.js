module.exports = {
  database: {
    name: process.env.DB_NAME || "user_s_collection",
    user: process.env.DB_USER || "root",
    password: process.env.DB_PASSWORD || "",
    host: process.env.DB_HOST || "localhost",
    port: parseInt(process.env.DB_PORT) || 3306,
  },
  server: {
    port: parseInt(process.env.PORT) || 3001,
  },
  seed: {
    enabled: process.env.SEED_DATA === "true",
  },
};
