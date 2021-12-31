const path = require("path");
const express = require("express");
const bodyParser = require('body-parser');
const errorMiddleware = require("./middlewares/errorMiddleware");
const { PORT } = require("./config");

// routes
const userRouter = require("./routes/user");
const bookRouter = require("./routes/books");
const indexRouter = require("./routes");

const app = express();

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"));

app.use(express.static(path.join(__dirname, "/uploads")));
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use("/", indexRouter);
app.use("/user", userRouter);
app.use("/books", bookRouter);

app.use(errorMiddleware);

app.listen(PORT, () => {
  console.log(`App listening at http://localhost:${PORT}`);
});