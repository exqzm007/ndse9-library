const express = require("express");
const bodyParser = require("body-parser");
const errorMiddleware = require("./middlewares/errorMiddleware");

// routes
const counterRouter = require("./routes/counter");

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use("/counter", counterRouter);

app.use(errorMiddleware);

const PORT = process.env.PORT || 3002;
app.listen(PORT, () => {
  console.log(`App listening at http://localhost:${PORT}`);
});
