const express = require("express");
const bodyParser = require('body-parser');

// routes
const userRouter = require("./routes/user");
const bookRouter = require("./routes/books");

const app = express();

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use("/api/user", userRouter);
app.use("/api/books", bookRouter);

app.use((err, req, res, next) => {
  res.status(500).json({
    error: err.toString()
  })
})

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`App listening at http://localhost:${PORT}`);
});