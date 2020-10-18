var express = require('express');
var router = express.Router();
var Campground = require('../models/campground');


// INDEX - Display all campgrounds
router.get('/', function(req, res){
  // console.log(req.user); req.user will contain the id and the username
  Campground.find({}, function(err, allCampgrounds){
    if(err){
      console.log(err);
    } else {
      // ADDED currentUser: req.user TO USE IN SHOWING/HIDING LINKS DEPENDING IF USER IS LOGGED IN
      // we can actually get rid of --> currentUser: req.user since we have app.use in our app.js
      // just kept it here for reference
      res.render('campgrounds/index', {campgrounds: allCampgrounds, currentUser: req.user});
    }
  });
});

// CREATE - Add new campground to db
router.post('/',isLoggedIn, function(req, res){
  var name = req.body.name;
  var image = req.body.image;
  var description = req.body.description;
  // add username and id to created campground then pass it to new campground
  var author = {
    id: req.user._id,
    username: req.user.username
  }
  var newCampground = {name: name, image: image, description: description, author:author};
  Campground.create(newCampground, function(err, newCampground){
    if(err){
      console.log(err);
    } else {
      console.log('==========================');
      console.log(newCampground);
      console.log('==========================');
      res.redirect('/campgrounds');
    }
  });
});

// NEW - Displays the form to create a new campground
router.get('/new',isLoggedIn, function(req, res){
  res.render('campgrounds/new');
});

// SHOW - shows more info about one campground
router.get('/:id',isLoggedIn, function(req, res){
  // find the campground with provided ID
  Campground.findById(req.params.id).populate('comments').exec(function(err, foundCampground){
    if(err){
      console.log('You hit an error');
      console.log(err);
    } else {
      console.log(foundCampground)
      // render show template with that campground
      res.render('campgrounds/show', {campground: foundCampground});
    }
  });
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
