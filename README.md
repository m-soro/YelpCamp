# YELP CAMP V1

* Add Landing Page
* Add Campgrounds Page that lists all Campgrounds
    - `app.get('/campgrounds')` **shows the campgrounds**

* Each Campground has:
  * Name
      - use `forEach` to iterate over the array of campgrounds.
  * Image
      - `<img src="<%= camp.image %>" alt="">` *notice that ejs tags are inside the* `<img src=" "`.

## Layout and Basic Stylings

* Create header/footer inside views/partials/ directory
    - `<%- include ('partials/header') %>` syntax for linking the header and footers.
* Add in Bootstrap
    - inside the head add the bootrap cdn.

## Creating New Campgrounds

* Set up new campgrounds POST Route
    - following the REST convention...
    - `app.post('/campgrounds')` **creates a new campgrounds**
    - test this **POST** route using post man **(since both /campgrounds has GET and POST request)**.
    ```
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
    ```  
* Add in body-parser
    - **HTTP POST** request requires body-parser. To install:
    `npm install body-parser --save`.
    - import and use:
    ```
    var bodyParser = require('body-parser');
    app.use(bodyParser.urlencoded({extended: true}));
    ```
* Set up route to show form
    - instead of having the form inside the campgrounds page, we'll create a separate page to add in a new campground.
    - use `GET` request.
    - `app.get('/campgrounds/new')` **shows the form that will send the data to the campgrounds post route->** `app.post('/campgrounds')`.

* add basic unstyled form    
