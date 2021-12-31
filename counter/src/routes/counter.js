const express = require("express");
const router = express.Router();
const redis = require("redis");

const REDIS_URL = process.env.REDIS_URL || "localhost";
const client = redis.createClient({
  url: `redis://${REDIS_URL}`
});

(async () => {
    await client.connect();
})();

router
    .post("/:bookId/incr", async (req, res) => {
        const { bookId } = req.params;
        try {
            const views = await client.incr(bookId);
            res.json({ views });
        } catch (e) {
            res.status(500).json({ errmessage: e.message })
        }
    })
    .get("/:bookId", async (req, res) => {
        const { bookId } = req.params;
        try {
            const views = await client.get(bookId);
            res.json({ views });
        } catch (e) {
            res.status(500).json({ errmessage: e.message });
        }
    })

module.exports = router;
