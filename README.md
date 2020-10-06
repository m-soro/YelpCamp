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
