// server.js
// where your node app starts

// we've started you off with Express (https://expressjs.com/)
// but feel free to use whatever libraries or frameworks you'd like through `package.json`.
var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var low = require("lowdb");
var FileSync = require("lowdb/adapters/FileSync");

var adapter = new FileSync("db.json");
var db = low(adapter);
app.set("view engine", "pug");
app.set("views", "./views");
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
// https://expressjs.com/en/starter/basic-routing.html
db.defaults({ todolist: [] }).write();
app.get("/", (request, response) => {
  response.render("index");
});
// app.post("/", function(req, res) {
//   res.send("POST request to homepage");
// });
app.get("/users", (req, res) => {
  res.render("users/index", {
    users: db.get('todolist').value()
  });
});
app.get("/users/search", (req, res) => {
  var q = req.query.q;
  var matchUsers = db.get('todolist').value().filter(x => {
    return x.job.toLowerCase().indexOf(q.toLowerCase()) !== -1;
  });
  res.render("users/index", {
    users: matchUsers
  });
});
app.get("/users/create", (req, res) => {
  res.render("users/create", {
    users: db.get("todolist").value()
  });
});
app.post("/users/create", (req, res) => {
  db.get("todolist").push(req.body).write();
  res.redirect("/users");
});
// listen for requests :)<
app.listen(process.env.PORT, () => {
  console.log("Server listening on port " + process.env.PORT);
});
