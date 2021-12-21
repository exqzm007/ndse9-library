const express = require("express");
const bodyParser = require('body-parser');
const errorMiddleware = require("./middlewares/errorMiddleware");

// routes
const userRouter = require("./routes/user");
const bookRouter = require("./routes/books");
const indexRouter = require("./routes");

const app = express();

app.set("view engine", "ejs");

app.use(express.static("uploads"))
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use("/", indexRouter);
app.use("/user", userRouter);
app.use("/books", bookRouter);

app.use(errorMiddleware);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`App listening at http://localhost:${PORT}`);
});