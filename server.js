// server.js
// where your node app starts

// we've started you off with Express (https://expressjs.com/)
// but feel free to use whatever libraries or frameworks you'd like through `package.json`.
var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var low = require("lowdb");
var FileSync = require("lowdb/adapters/FileSync");
const shortid = require('shortid');

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
  //console.log(db.get('todolist').value()[0].id);
});
app.get("/users", (req, res) => {
  res.render("users/index", {
    users: db.get("todolist").value()
  });
});
app.get("/users/search", (req, res) => {
  var q = req.query.q;
  var matchUsers = db
    .get("todolist")
    .value()
    .filter(x => {
      return x.name.toLowerCase().indexOf(q.toLowerCase()) !== -1;
    });
  res.render("users/index", {
    users: matchUsers
  });
});
app.get("/users/delete", (req, res) => {
  res.render("users/delete", {
    users: db.get("todolist").value()
  });
});
app.get("/users/delete/:id", (req, res) => {
  var id = req.params.id;
  for(var i = 0; i < db.get('todolist').value().length; i++){;
    if(id === db.get('todolist').value()[i].id) {
      db.get('todolist').value().splice(i,1);
    }
  }
  res.redirect("/users");
});
app.get("/users/create", (req, res) => {
  res.render("users/create", {
    users: db.get("todolist").value()
  });
  res.redirect("/users");
});
app.get("/users/:id", (req, res) => {
  var id = req.params.id;
  var user = db.get('todolist').find({id:id}).value();
  res.render('users/view', {
    user: user
  }) 
})

app.post("/users/create", (req, res) => {
  req.body.id = shortid.generate();
  db.get("todolist")
    .push(req.body)
    .write();
  res.redirect("/users");
});
// listen for requests :)<
app.listen(process.env.PORT, () => {
  console.log("Server listening on port " + process.env.PORT);
});
