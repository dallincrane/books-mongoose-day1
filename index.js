var express = require('express');
var bodyParser = require('body-parser');
var session = require('express-session');
var mongoose = require('mongoose');

var BookController = require('./controllers/BookController');
var AuthorController = require('./controllers/AuthorController');

var config = require('./config.json');

var logger = function(req, res, next) {
  console.log('body --> ', req.body);
  console.log('params --> ', req.params);
  console.log('session -->', req.session);
  next();
};

var app = express();
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());
app.use(session({
  secret: config.sessionSecret,
  saveUninitialized: true,
  resave: true
}));

app.get('/books', logger, BookController.index);
app.get('/books/:id', BookController.show);
app.put('/books/:id', BookController.update);
app.post('/books', BookController.create);
app.delete('/books/:id', BookController.destroy);

app.get('/authors', logger, AuthorController.index);
app.get('/authors/:id', AuthorController.show);
app.put('/authors/:id', AuthorController.update);
app.post('/authors', AuthorController.create);
app.delete('/authors/:id', AuthorController.destroy);

app.get('/cart', function(req, res, next) {
  res.status(200).json(req.session.cart);
});

app.post('/cart', function(req, res, next) {
  if(!req.session.cart) req.session.cart = [];
  req.session.cart.push(req.body);
  res.status(204).send();
});

var port = 3000;
var mongoURI = 'mongodb://localhost:27017/biblioteca';

mongoose.connect(mongoURI);
mongoose.connection.once('open', function() {
  console.log('Connected to Mongo DB at', mongoURI);
  app.listen(port, function() {
    console.log('Listening to port ', port);
  });
});
mongoose.connection.on('error', function() {
  console.error('Unable to connect to ', mongoURI);
});
