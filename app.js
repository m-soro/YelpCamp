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
    deleteComment         = require('./delete')

// ReQUIRING ROUTES
var commentRoutes         = require('./routes/comments'),
    campgroundRoutes      = require('./routes/campgrounds'),
    indexRoutes           = require('./routes/index')

// seedDb(); //seed the database
// deleteComment();

mongoose.connect('mongodb://localhost/yelp_camp',
{useNewUrlParser:true, useUnifiedTopology: true});

app.use(bodyParser.urlencoded({extended: true}));
app.set('view engine', 'ejs');
app.use(express.static('public'));

// PASSPORT CONFIGURATION
app.use(require('express-session')({
  secret: 'Chocolate Torte',
  resave: false,
  saveUnintialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


app.use(function(req, res, next){
  res.locals.currentUser = req.user;
  next();
});

app.use('/',indexRoutes);
// we're telling all campground routes should start with /campgrounds
// go to campgrounds route and delete the 'campgrounds' in route declaration
app.use('/campgrounds', campgroundRoutes);
app.use('/campgrounds/:id/comments',commentRoutes);



app.listen(3000, function(){
  console.log('The Yelp Camp Server has started');
});
