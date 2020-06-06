// server.js
// where your node app starts

// we've started you off with Express (https://expressjs.com/)
// but feel free to use whatever libraries or frameworks you'd like through `package.json`.
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
app.set('view engine', 'pug');
app.set('views', './views');
app.use(bodyParser.json()) // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded
// https://expressjs.com/en/starter/basic-routing.html
var data = [
  {id: 1, job: 'Di cho'},
  {id: 2, job: 'Nau com'},
  {id: 3, job: 'rua bat'},
  {id: 4, job: 'Di choi'}
]
app.get('/', (request, response) => {
  response.render('index');
});
app.post('/', function (req, res) {
  res.send('POST request to homepage')
})
app.get('/users', (req, res) => {
  res.render('users/index', {
    users: data
  });
});
app.get('/users/search',(req, res) => {
  var q = req.query.q;
  var matchUsers = data.filter((x) => {
    return x.job.toLowerCase().indexOf(q.toLowerCase()) !== -1;
  });
  res.render('users/index', {
    users: matchUsers
  });
})
app.get('/users/create', (req, res) => {
  res.render('users/create', {
    users: data
  });
})
app.post('/users/create', (req, res) => {
  data.push(req.body);
  res.redirect('/users');
})
// listen for requests :)<
app.listen(process.env.PORT, () => {
  console.log("Server listening on port " + process.env.PORT);
});
