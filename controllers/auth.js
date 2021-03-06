var express = require('express');
var router = express.Router();
var db = require('../models');
var passport = require('../config/ppConfig');

router.get('/signup', function(req, res) {
  res.render('auth/signup');
});

router.get('/login', function(req, res) {
  res.render('auth/login');
});

router.post('/signup', function(req, res) {
  // try sending back the form data
  db.user.findOrCreate({
    where: { email: req.body.email },
    defaults: {
      name: req.body.name,
      password: req.body.password
    }
  }).spread(function(user, created) {
    if (created) {
       passport.authenticate('local', {
        successRedirect: '/',
        successFlash: 'Account created and logged in'
      })(req, res);
      // if created, success and redirect home
      // console.log('User created!');
      // res.redirect('/');
    } else {
      // if not created, the email already exists
       req.flash('error', 'Email already exists');
      res.redirect('/auth/signup');
    }
  }).catch(function(error) {
    // if an error occurs, let's see what the error is
    req.flash('error', error.message);
    res.redirect('/auth/signup');
  });

  //res.send(req.body);
});


router.post('/login', passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/auth/login',
  failureFlash: 'Invalid username and/or password',
  successFlash: 'You have logged in'
}));

router.get('/logout', function(req, res) {
  req.logout();
  req.flash('success', 'You have logged out');
  res.redirect('/');
});


module.exports = router;