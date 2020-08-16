var express = require('express')
var app = express();
var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({extended: true}));

app.set('view engine', 'ejs');

var campgrounds = [
  {name: 'Camp Leon', image:'https://www.campverde.az.gov/Home/ShowPublishedImage/574/637268597658600000' },
  {name: 'Beaver Tail\'s', image:'https://media-cdn.tripadvisor.com/media/photo-s/13/b8/8a/28/olakira-camp-asilia-africa.jpg' },
  {name: 'Camp Mary', image: 'https://ellaslist.com.au/system/articles/featured_images/000/002/240/original/summer_camp_for_adults.jpg?1504032697'}
];

app.get('/', function(req, res){
  res.render('landing')
});

app.get('/campgrounds', function(req, res){
  res.render('campgrounds', {campgrounds: campgrounds});
});

app.post('/campgrounds', function(req, res){
  // get data from form and add to campgrounds array
  var name = req.body.name;
  var image = req.body.image;
  // push the name and image as a campground object!
  var newCampground = {name: name, image: image};
  campgrounds.push(newCampground);
  // redirect back to campgrounds page - defaults to GET request
  res.redirect('/campgrounds');
});

app.get('/campgrounds/new', function(req, res){
  res.render('new.ejs');
});

app.listen(3000, function(){
  console.log('The Yelp Camp Server has started');
});
