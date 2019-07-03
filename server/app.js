var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var bodyParser = require("body-parser");
var logger = require("morgan");
var mongoose = require("mongoose");

var userRouter = require("./routes/user");
var bookRouter = require("./routes/book");
var commentRouter = require("./routes/comment");
var secKillRouter = require("./routes/secKill");
var partitionRouter = require("./routes/partition");

var app = express();

mongoose.connect("mongodb://localhost/jingmao", { useNewUrlParser: true });
var db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function() {
  console.log("we are connected!");
});

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "public")));

app.use("/api/user", userRouter);
app.use("/api/book", bookRouter);
app.use("/api/comment", commentRouter);
app.use("/api/secKill", secKillRouter);
app.use("/api/partition", partitionRouter);

app.get("/", (req, res) => {
  res.json("qqqqq");
});

app.use(function(req, res, next) {
  next(createError(404));
});

app.use(function(err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
