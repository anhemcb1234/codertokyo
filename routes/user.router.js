var express = require("express");
var router = express.router();
var db = require('../db');
const shortid = require("shortid");
router.get("/", (req, res) => {
  res.render("user/index", {
    users: db.get("todolist").value()
  });
});
router.get("/search", (req, res) => {
  var q = req.query.q;
  var matchUsers = db
    .get("todolist")
    .value()
    .filter(x => {
      return x.name.toLowerCase().indexOf(q.toLowerCase()) !== -1;
    });
  res.render("/index", {
    users: matchUsers
  });
});
router.get("//delete", (req, res) => {
  res.render("user/delete", {
    users: db.get("todolist").value()
  });
});
router.get("/delete/:id", (req, res) => {
  var id = req.params.id;
  for (var i = 0; i < db.get("todolist").value().length; i++) {
    if (id === db.get("todolist").value()[i].id) {
      db.get("todolist")
        .value()
        .splice(i, 1);
    }
  }
  res.redirect("/users");
});
router.get("/create", (req, res) => {
  res.render("users/create", {
    users: db.get("todolist").value()
  });
  res.redirect("/users");
});
router.get("/:id", (req, res) => {
  var id = req.params.id;
  var user = db
    .get("todolist")
    .find({ id: id })
    .value();
  res.render("user/view", {
    user: user
  });
});

router.post("/create", (req, res) => {
  req.body.id = shortid.generate();
  db.get("todolist")
    .push(req.body)
    .write();
  res.redirect("/users");
});

module.exports = router;