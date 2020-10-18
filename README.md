# YELP CAMP

## REFACTORED VERSION
  - start by `mkdir routes` inside it is `campgrounds.ejs`, `comments.ejs` and `index.ejs`-> kinda like the all purpose routes, not really related to all of our routes, for us this is the `root route`, `auth routes` and `isLoggedIn`.
  - start by separating all our routes in their respective ejs file.
  - you'll run into errors, we have to use express router
```
  var express = require('express');
  var router = express.Router();
```
  *Instead of giving app the route, we'll give router the route like this:*
  ```
    router.get
    router.post
    router.get
  ```
  *then we export the router*

  `module.exports = router;`

  *Next, we'll require all this routes in app.js*
```
  var commentRoutes         = require('./routes/comments'),
      campgroundRoutes      = require('./routes/campgrounds'),
      indexRoutes           = require('./routes/index')

```
  *Then lets* `app.use` *it!*

```
  app.use(commentRoutes);
  app.use(campgroundRoutes);
  app.use(indexRoutes);
```  
  *No quotation marks in app.use!*
  *This tells express to use all our routes -- now just do the same with all our routes!*

  **Make sure that required models and functions are added as well!**

  In `router/campgrounds.js`
  ```
    var express = require('express');
    var router = express.Router();
    var Campground = require('../models/campground');

  ```
  In `router/comment.js`
  ```
    var express = require('express');
    var router = express.Router();
    var Campground = require('../models/campground')
    var Comment = require('../models/comment')


  ```
  In `router/index.js`
  ```
    var express = require('express');
    var router = express.Router();
    var passport = require('passport');
    var User = require('../models/user');

  ```

  *We can even dry up our code to reduce duplication in route declaration*

  we're telling all campground routes should start with /campgrounds
  go to campgrounds route and delete the 'campgrounds' in route declaration
  ```
    app.use(commentRoutes);   ---> app.use('/',indexRoutes);
    app.use(campgroundRoutes);---> app.use('/campgrounds', campgroundRoutes);
    app.use(indexRoutes);     ---> app.use('/campgrounds/:id/comments',commentRoutes);
  ```
In `routes/comments.js`:
```
  // mergeParams will merge campgrounds params and comments params together
  var router = express.Router({mergeParams:true});

```
so we can access the `:id` variable in `app.use('/campgrounds/:id/comments',commentRoutes);` in `app.js`.

## Users + Comments
  * Associate users and comments
  * Save author's name to a comment automatically ...
    - on the comment model we need to add some fields in to store the user's id and the user's name by storing an object under author with two properties.
    - we removed all campgrounds then commented out the `seedDb`

*Now let's go in the comments route which creates the actual comment*
*Remove the author field in* `views/comments/new.ejs`

  - In `route/comment.js` in comment.create let's associate the user to the comment by `comment.author.id = req.user._id` this is following the comment model and associate the user name by `comment.author.username = req.user.username` then `comment.save()`.

## Users + Campgrounds
* Prevent an unauthenticated user from creating a campground
    - basically will do the same thing like the `Users + Comments`, but this time is for campgrounds. two ideas here is that we don't want anyone submitting a campground if they don't have an account. Anyone can view the campground but can't submit a comment or a campground if they don't have an account.
    - point 2, is that we want to save the username and id to the newly created campground. so in the campground show page we can show who created it. so that we know who can delete that campground or comment thats why we need that id and username to work.

    Let's start with the un authenticated user prevention.

    - we don't want the user to see the `new` form if they are not log in.
    so we'll protect the `new` and `post` routes, by adding `isLoggedIn` to both.
    - this should prevent unauthorized access.

* Save username+id to newly created campground
    - we have to change the schema first, we'll add the author property as an object.
    ```
        author: {
          id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
          },
          username: String
        },
    ```
    - set up the logic inside campground create, so when a campground is created we take the user's id and username.
    ```
      router.post('/',isLoggedIn, function(req, res){
        var name = req.body.name;
        var image = req.body.image;
        var description = req.body.description;

        // add username and id to created campground then pass it to new campground
        var author = {
          id: req.user._id,
          username: re.user.username
        }
        var newCampground = {name: name, image: image, description: description, author:author};
        Campground.create(newCampground, function(err, newCampground){
          if(err){
            console.log(err);
          } else {
            console.log(newCampground);
            res.redirect('/campgrounds');
          }
        });
      });
    ```
    - at this point the campground will have all the user's info

* So for unauthorized user prevention, we just used the `isLoggedIn` middleware.
* Then we updated the campground schema, so we have the username and id in it, then we populate that when we created the `newCampground` then we displayed it in the `show` page.

    
