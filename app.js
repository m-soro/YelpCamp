var express               = require('express'),
    app                   = express(),
    bodyParser            = require('body-parser')
    mongoose              = require('mongoose'),
    Campground            = require('./models/campground'),
    Comment               = require('./models/comment'),
    User                  = require('./models/user'),
    seedDb                = require('./seeds'),
    passport              = require('passport'),
    LocalStrategy         = require('passport-local'),
    passportLocalMongoose = require('passport-local-mongoose'),
    session               = require('express-session')


seedDb();

mongoose.connect('mongodb://localhost/yelp_camp',
{useNewUrlParser:true, useUnifiedTopology: true});

app.use(bodyParser.urlencoded({extended: true}));
app.set('view engine', 'ejs');
app.use(express.static('public'));


// SCHEMA setup
// commented since were using models

// var Schema = mongoose.Schema;
// var campgroundSchema = new Schema({
//   name: String,
//   image: String,
//   description: String
// });
// var Campground = mongoose.model('Campground', campgroundSchema);

// Campground.create(
//   {
//     name: 'Granite Hill',
//     image: 'https://www.appletonmn.com/vertical/Sites/%7B4405B7C1-A469-4999-9BC5-EC3962355392%7D/uploads/campground_(2).jpg',
//     description: 'Wonderful campground 1 hour away from Washington DC!'
//   },
//   function(err, newCampground){
//     if(err){
//       console.log('You hit an error');
//       console.log(err);
//     } else {
//       console.log('The newly created campground');
//       console.log(newCampground);
//     }
// });


app.get('/', function(req, res){
  res.render('landing')
});

// INDEX - Display all campgrounds
app.get('/campgrounds', function(req, res){
  Campground.find({}, function(err, allCampgrounds){
    if(err){
      console.log(err);
    } else {
      res.render('campgrounds/index', {campgrounds: allCampgrounds});
    }
  });
});

// CREATE - Add new campground to db
app.post('/campgrounds', function(req, res){
  var name = req.body.name;
  var image = req.body.image;
  var description = req.body.description;
  var newCampground = {name: name, image: image, description: description};
  Campground.create(newCampground, function(err, newCampground){
    if(err){
      console.log(err);
    } else {
      res.redirect('/campgrounds');
    }
  });
});

// NEW - Displays the form to create a new campground
app.get('/campgrounds/new', function(req, res){
  res.render('campgrounds/new');
});

// SHOW - shows more info about one campground
app.get('/campgrounds/:id', function(req, res){
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

// ================
// COMMENTS ROUTES
// ================

// NEW - Show the form to create new comment
app.get('/campgrounds/:id/comments/new', function(req, res){
  // find campground by id
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
app.post('/campgrounds/:id/comments', function(req, res){
  // look up campground using ID
  Campground.findById(req.params.id, function(err, campground){
    if(err) {
      console.log(err);
      res.redirect('/campgrounds');
    } else {
      console.log(req.body.comment);
      // create new comment
      Comment.create(req.body.comment, function(err, comment){
        if(err) {
          console.log(err);
        } else {
        // associate new comment to campground
        campground.comments.push(comment);
        // save the comment to the campground model
        campground.save();
        // redirect to that campground show page
        res.redirect('/campgrounds/' + campground._id);
        }
      });
    }
  });
});


app.listen(3000, function(){
  console.log('The Yelp Camp Server has started');
});
