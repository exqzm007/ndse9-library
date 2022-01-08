const express = require("express");
const router = express.Router();

router.post("/login", (req, res) => {
    // todo fix after auth lesson
    res.status(201).json({ id: 1, mail: "test@mail.ru" });
})

module.exports = router;