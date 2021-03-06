
var express = require('express');
// mergeParams will merge campgrounds params and comments params together
var router = express.Router({mergeParams:true});
var Campground = require('../models/campground')
var Comment = require('../models/comment')


// NEW - Show the form to create new comment
router.get('/new', isLoggedIn, function(req, res){
  // find campground by id
  //console.log(req.params.id);
  Campground.findById(req.params.id, function(err, campground){
    if(err) {
      console.log(err);
    } else {
      // render the comments/new and pass the found campground in that form
      res.render('comments/new', {campground: campground});
    }
  });
});

// CREATE - the actual maker of the comment - this is where the new form submits!
router.post('/', isLoggedIn, function(req, res){
  // look up campground using ID
  Campground.findById(req.params.id, function(err, campground){
    if(err) {
      console.log(err);
      res.redirect('/campgrounds');
    } else {
      // console.log(req.body.comment);
      // create new comment
      Comment.create(req.body.comment, function(err, comment){
        if(err) {
          console.log(err);
        } else {
        // before we push the comment in to the campground
        // were going to add the username and id to the comment
        comment.author.id = req.user._id;
        comment.author.username = req.user.username;
        comment.save();
        // associate new comment to campground
        campground.comments.push(comment);
        // save the comment to the campground model
        campground.save();
        // redirect to that campground show page
        console.log('=====NEW COMMENT=======')
        console.log(comment);
        console.log('=======================')
        res.redirect('/campgrounds/' + campground._id);
        }
      });
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
