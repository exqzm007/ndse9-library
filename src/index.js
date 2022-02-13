const mongoose = require("mongoose");
const path = require("path");
const express = require("express");
const bodyParser = require('body-parser');
const session = require("express-session");
const passport = require("./configs/passportCfg");
const cookieParser = require('cookie-parser');

const errorMiddleware = require("./middlewares/errorMiddleware");
const { PORT, DB_HOST, DB_NAME, DB_PASSWORD, DB_USERNAME, SESSION_SECRET } = require("./config");

// routes
const userRouter = require("./routes/user");
const bookRouter = require("./routes/books");
const indexRouter = require("./routes");

const app = express();

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"));

app.use(express.static(path.join(__dirname, "/uploads")));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(session({
  secret: SESSION_SECRET,
  resave: false,
  saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
app.use((req, res, next) => {
  console.log("REQ SESSION", req.session);
  console.log("REQ USER", req.user);
  next();
})

app.use("/", indexRouter);
app.use("/user", userRouter);
app.use("/books", bookRouter);

app.use(errorMiddleware);

function start() {
  try {
    mongoose.connect(DB_HOST, {
        user: DB_USERNAME,
        pass: DB_PASSWORD,
        dbName: DB_NAME
      }, () => {
        app.listen(PORT, () => {
          console.log(`App listening at http://localhost:${PORT}`);
        });
      }
    )
  } catch (e) {
    console.error("An error occured while initializing an app")
  }
}

start();
