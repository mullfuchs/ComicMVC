var express = require('express');
var ejsLayouts = require('express-ejs-layouts');
var bodyParser = require('body-parser');
var session = require('express-session');
var passport = require('./config/ppConfig');

var isLoggedIn = require('./middleware/isLoggedIn');

var flash = require('connect-flash');
var app = express();


app.set('view engine', 'ejs');

app.use(require('morgan')('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(ejsLayouts);

app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true
}));

app.use(flash());

// initialize the passport configuration and session as middleware
app.use(passport.initialize());
app.use(passport.session());

app.use(function(req, res, next) {
  // before every route, attach the flash messages and current user to res.locals
  res.locals.alerts = req.flash();
  res.locals.currentUser = req.user;
  next();
});


app.get('/', function(req, res) {
  res.render('index');
});

app.get('/profile', isLoggedIn, function(req, res) {
  res.render('profile');
});

app.get('/newcomic', isLoggedIn, function(req, res){
  res.render('post');
});

router.post('/newcomic', function(req, res) {
  // try sending back the form data
  db.comic.create({
    title: req.body.comicTitle,
    content: req.body.comicBlog,
    imageSource: req.body.comicLink
  }).then(function(data){
    res.render('index');
  });

  //res.send(req.body);
});

app.use('/auth', require('./controllers/auth'));



var server = app.listen(process.env.PORT || 3000);

module.exports = server;