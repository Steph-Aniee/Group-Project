var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");

var indexRouter = require("./routes/index");
var recipeRouter = require("./routes/recipe");
let usersRouter = require("./routes/users");
let assistantRouter = require("./routes/assistant");

var app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
//app.use(express.static(path.join(__dirname, "public"))); //not using the public folder for now

app.use("/api/users", usersRouter);
app.use("/api", indexRouter);
app.use("/api/recipe", recipeRouter);
app.use("/api/assistant", assistantRouter);

module.exports = app;
