const PORT = process.env.PORT || 3000;
const COUNTER_PORT = process.env.COUNTER_PORT || 3002;
const COUNTER_API = process.env.COUNTER_API || "localhost";

module.exports = {
  PORT,
  COUNTER_API,
  BASE_COUNTER_API_URL: `http://${COUNTER_API}:${COUNTER_PORT}/`,
};