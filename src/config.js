const PORT = process.env.PORT || 3000;
const DB_USERNAME = process.env.DB_USERNAME || "root";
const DB_PASSWORD = process.env.DB_PASSWORD;
const DB_NAME = process.env.DB_NAME || "todo_db";
const DB_HOST = process.env.DB_HOST || "mongodb://mongodb:27017";
const SESSION_SECRET = process.env.SESSION_SECRET;

module.exports = {
  PORT,
  DB_USERNAME,
  DB_PASSWORD,
  DB_HOST,
  DB_NAME,
  SESSION_SECRET
};