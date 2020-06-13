// server.js
// where your node app starts

// we've started you off with Express (https://expressjs.com/)
// but feel free to use whatever libraries or frameworks you'd like through `package.json`.
var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var userRouter = require("./routes/user.router");
var db = require("./db");

app.set("view engine", "pug");
app.set("views", "./views");
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
// https://expressjs.com/en/starter/basic-routing.html
app.get("/", (request, response) => {
  response.render("index");
  //console.log(db.get('todolist').value()[0].id);
});
app.use("/users", userRouter);
// listen for requests :)<
app.listen(process.env.PORT, () => {
  console.log("Server listening on port " + process.env.PORT);
});
