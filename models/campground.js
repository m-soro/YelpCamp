var mongoose = require('mongoose');

// SCHEMA setup
var Schema = mongoose.Schema;
var campgroundSchema = new Schema({
  name: String,
  image: String,
  description: String,
  comments:[
    {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Comment'
    }
  ]
});

module.exports = mongoose.model('Campground', campgroundSchema);
