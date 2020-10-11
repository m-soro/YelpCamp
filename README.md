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
    - on the comment model we need to add some fields in to store the user's id and the user's name.
    - we removed all campgrounds then commented out the `seedDb`

*Now let's go in the comments route which creates the actual comment*
*Remove the author field in* `views/comments/new.ejs`
