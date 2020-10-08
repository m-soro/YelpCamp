var express = require('express');
var router = express.Router();
var passport = require('passport');
var User = require('../models/user');

router.get('/', function(req, res){
  res.render('landing')
});


// SHOW REGISTER FORM
router.get('/register', function(req, res){
  res.render('register');
});

// CREATE - handle REGISTER logic
router.post('/register', function(req, res){
  // res.send('Signing you up'); JUST TESTING
  // newUser IS JUST THE USER'S USERNAME
  var newUser = new User({username: req.body.username});
  // User.register TAKES THE USER'S USERNAME THEN STORES THE PASSWORD IN A HASH FORM
  User.register(newUser, req.body.password, function(err, user){
    if(err) {
      console.log(err);
      return res.render('register');
    }
    // IF ALL WORKS THEN passport.authenticate WILL LOG THE USER IN
    passport.authenticate('local')(req, res, function(){
      res.redirect('/campgrounds')
    });
  });
});

// SHOW LOGIN FORM
router.get('/login', function(req, res){
  res.render('login');
});

// CREATE - HANDLES THE LOG IN LOGIC
// MIDDLEWARE - SITS BETWEEN THE BEGINNING AND BEFORE THE END OF THE ROUTE
// passport.authenticate - CHECKS THE CREDENTIALS. IT AUTHENTICATES
// WILL TAKE THE USERNAME AND PASSWORD INSIDE request.body THEN WE PROVIDE AN OBJECT
// WITH TWO OPTIONS: SUCCESS AND FAILURE
router.post('/login', passport.authenticate('local',
  {
      successRedirect: '/campgrounds',
      failureRedirect: '/login'
  }), function(req, res){

});

// LOG OUT ROUTE
router.get('/logout', function(req, res){
  // passport COMES WITH logout() method
  req.logout();
  res.redirect('/campgrounds');
});

// MIDDLEWARE FOR isLoggedIn function
function isLoggedIn(req, res, next){
  // CHECK IF isAuthenticated (COMES WITH PASSPORT),
  if(req.isAuthenticated()){
    // IF YES, RUN THE NEXT STEP
    return next();
  } // IF NOT, REDIRECT TO LOGIN AGAIN
  res.redirect('/login')
}

module.exports = router;
