# YELP CAMP V1

* Add Landing Page
* Add Campgrounds Page that lists all Campgrounds
    - `app.get('/campgrounds')` **shows the campgrounds**

* Each Campground has:
  * Name
      - use `forEach` to iterate over the array of campgrounds.
  * Image
      - `<img src="<%= camp.image %>" alt="">` *notice that ejs tags are inside the* `<img src=" "`.

# Layout and Basic Stylings

* Create header/footer inside views/partials/ directory
    - `<%- include ('partials/header') %>` syntax for linking the header and footers.
* Add in Bootstrap
    - inside the head add the bootrap cdn.

# Creating New Campgrounds

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
    - `app.get('/campgrounds/new')` **shows the form that will send the data to the campgrounds post route** `app.post('/campgrounds')`.

* Add basic unstyled form
    - fix header with `jumbotron`.
    - stick everything inside `<div class="container">` to give it white space around the sides and any sections that needs whitespace.

# Style the campgrounds page
  - Add a better header/title
  - Make campgrounds display in a grid
    - Bootstrap classes used:
      `row`
      `col-lg-12`
      `row text-center`
      `col-md-3 col-sm-6`
      `thumbnail`
      `caption`

# Style the Navbar and Form
    - Add a navbar to all templates
      - Bootstrap classes used:
        `navbar navbar-default`
        `container-fluid`
        `navbar-header`
        `navbar-brand`
        `collapse navbar-collapse`
        `nav navbar-nav navbar-right`

# Style the new campground form
      - Bootstrap classes used:
        `form-group`
        `form-control`
        `container`
        `row`
        `btn-block`

# Databases

# Intro to Databases

* What is a database?
  - A collection of information/data.
  - They have an **interface for interacting with the data**, editing, manipulating, adding or removing.

* **SQL(relational)**
  - Tabular and flat, they must follow a strict pattern. Not flexible.
  - Using **join table** and **id** you can establish relation between to separate tables.
  -

* **NoSQL(non-relational)**
  - Flexible. No Table. Things can be nested.
  - Looks like a javascript object! Bunch of key value pairs.  
  - `bson` - *binary javascript notation*

# Intro to MongoDB
  * What is Mongo
    - A NoSQL database.
    - Make a separate database for every app

# Our First Mongo Commands
  * `mongod` - starts the mongo demon runs in the background.
  * `mongo` - go to your data directory and run this command. Use to debug just like javascript console. *Quit* using `ctrl c`
  * `help`
  * `show dbs`
  * `use`
      - to create a new db `use <dbName>` if db exist, this uses said db.
      - won't show up until there's data in it.
      - `show collections` shows dogs

# Mongo's CRUD - Create Read Update Destroy

  * `insert`
      - add things using collection i.e. `db.dogs.insert({name:'Rusty', breed:'Mutt'})` automatically creates dogs collection.
  * `find`
      - `db.dogs.find()` returns all data in dogs collection
      - `db.dogs.find({name:'Rusty'})`
  * `update`
      - say we want to update Lulu's breed `db.dogs.update({name:'Lulu'}, {breed:'Labradoodle'})`, this will completely override everything in Lulu's data, only the breed will be left. If we want to preserve original data we use `db.dogs.update({name:'Lulu'},{$set:{name:Chica}})`, `{$set:{}}` will preserve the original data.
  * `remove`
      - `db.dogs.remove({breed:'Poodle'})` or add a limit on how many to remove `db.dogs.remove({breed:'Poodle'}).limit(1)`

# Intro to Mongoose      

  * What is Mongoose?
    - ODM object data mapper allows us write javascript file that interacts with database.

  * Why are we using it?

  * Interact with mongodb with mongoose
    - to connect mongodb to mongoose and to create a database dynamically which in this example is `cat_app`.  
    ```
    var mongoose = require('mongoose');
    mongoose.connect('mongodb://localhost/cat_app', {useNewUrlParser: true, useUnifiedTopology: true});
    var Schema = mongoose.Schema;
    ```

    * To define a pattern or schema to our database:
    ```
    var catSchema = new Schema({
        name: String,
        age: Number,
        temperament: String
    });

    var Cat = mongoose.model('Cat', catSchema);
    ```

    - save it to a variable after compiling it to a *model*, we can just use the said variable to perform CRUD:
    `var Cat = mongoose.model('Cat', catSchema);` *note that variable is the single version of any given name and Capitalize the first letter*
    - this returns an object that has a bunch of method like `create`, `find` etc,
    - you can then use `Cat.create`, `Cat.find`, etc...

    * To add/create a new cat:
    ```
    var george = new Cat({
        name: 'George',
        age: 11,
        temperament: 'Grouchy'
    });
    ```

    * To save to a database, with a callback function
    ```
    george.save(function(err, cat){
    if(err){
      console.log('something went wrong!');
      } else {
      console.log('We just saved a cat to the DB:');
      console.log(cat);
        }
      });
    ```
      - the variable `george` doesn't really matter, we're just using this as a javascript variable to communicate to our database `cat` is what really coming from the database.

    * Results in:
    ```
    We just saved a cat to the DB:
      {
      _id: 5f42cdb340fc55340e9ac815,
      name: 'George',
      age: 11,
      temperament: 'Grouchy',
      __v: 0
      }
    ```
    * To check:
      - go to directory run in terminal `mongo`
      - `show dbs`
      - `use <FileYouHadSavedOnMongoose.connect>`
      - `show collections`
      - `cats` is automatically pluralized!

    * **CRUD Methods**  
      - To retrieve data from db:
          - use the `find` method on `Cat` which is the *model*, `var Cat = mongoose.model('Cat', catSchema);`.
          - passing an empty object retrieves all of the cats and the call back function parameters can be named as how we choose to.
          - passing in a callback function because it may take some time or not even be execute.
          ```
          Cat.find({}, function(err, cats){
            if(err){
              console.log('Oh no, error!');
              console.log(err);
            } else {
              console.log('Here are all the cats');
              console.log(cats);
            }
          });
          ```
          - running this code will retrieve all of the cats!

      - To create a new item in db:
          - use the `create` method, which is `new` and `save` all at once!.
          ```
          Cat.create({
            name: 'Snow White',
            age: 15,
            temperament: 'Bland',
          }, function(err, newCat){
            if(err){
              console.log('Oops, you hit an error!');
              console.log(err);
            } else {
              console.log('Here is the new cat!');
              console.log(newCat);
            }
          });
          ```
# YELP CAMP V2

* Style the campgrounds Page
  - add a better header/title
  - make campgrounds display in a grid

* Style the Navbar and form
  - add a navbar to all templates
  - style the new campground form

* Add mongoose
  - install and configure mongoose `npm install mongoose --save` then require and set up the schema like above examples.
  - setup campground model

  - use campground model inside of our routes
    - instead of using this hardcoded array:
      ```
      app.get('/campgrounds', function(req, res){
        res.render('campgrounds', {campgrounds: campgrounds});
      });
      ```
    - let's use the `find` method to show campgrounds from DB
      ```
      app.get('/campgrounds', function(req, res){
        // get all campgrounds from DB
        Campground.find({}, function(err, allCampgrounds){
          if(err){
            console.log(err);
          } else {
            res.render('campgrounds', {campgrounds: allCampgrounds});
          }
        });
      });
      ```

      - adding new campgrounds, instead of pushing to the array like this:
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
      - let's use the `create` method
        ```
        app.post('/campgrounds', function(req, res){
          // get data from form and add to campgrounds array
          var name = req.body.name;
          var image = req.body.image;

          // push the name and image as a campground object!
          var newCampground = {name: name, image: image};

          // create a new campground by passing the newCampground object to `create` method
          Campground.create(newCampground, function(err, newCampground){
            if(err){
              console.log(err);
            } else {
              // redirect back to campgrounds page - defaults to GET request
              res.redirect('/campgrounds');
            }
          });
        });
        ```

* Show page
  - Review the RESTful routes we've seen so far

  - Add a show route/template

  - Index and Show are two read routes

  - SHOW route, to display the individual details about a campground. We'll add a link to the campgrounds cards. That when clicked should take us to SHOW page.

  - interact with mongo's id with `findById` access it using `req.params.id` and then the call back function.
    ```
    // SHOW - shows more info about one campground

    app.get('/campgrounds/:id', function(req, res){

      // find the campground with provided ID
      Campground.findById(req.params.id, function(err, foundCampground){
        if(err){
          console.log('You hit an error');
          console.log(err);
        } else {
          // render show template with that campground
          res.render('show', {campground: foundCampground});
        }
      });
    });
    ```
  - Add description to our campground model
  - Show `db.<collection>.drop()` deletes the whole collection in mongo

# Intro to REST

**REST**
  - A mapping between HTTP and CRUD
  - Conventional and reliable pattern

    *A Blog example*
      C reate     /blog *as a POST*
      R ead       /allBlogs
      U pdate     /updateBlog
      D estroy    /destroyBlog/:id

  - Representational State Transfer

# RESTful Routing
  - Define REST and explain WHY it matters
  - List all 7 RESTful routes
  - Show example of RESTful routing in practice

  **RESTFUL ROUTES**
  | Route Name    	| Path           	| Verb   	| Purpose                                	|
|---------	|----------------	|--------	|----------------------------------------	|
| INDEX   	| /dogs          	| GET    	| List all dogs                          	|
| NEW     	| /dogs/new      	| GET    	| Show new dog form                      	|
| CREATE  	| /dogs          	| POST   	| Create new dog then, redirect          	|
| SHOW    	| /dogs/:id      	| GET    	| Show info about one specific dog       	|
| EDIT    	| /dogs/:id/edit 	| GET    	| Show edit form for one dog             	|
| UPDATE  	| /dogs/:id      	| PUT    	| Update a particular dog then, redirect 	|
| DESTROY 	| /dogs/:id      	| DELETE 	| Delete a particular dog then, redirect 	|
