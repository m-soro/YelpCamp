var mongoose = require('mongoose');

// SCHEMA setup
var Schema = mongoose.Schema;
// on the comment model we need to add some fields in to store the user's id and the user's name
//
var commentSchema = new Schema({
  text: String,
  author: {
      id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
      },
      username: String
  }
});

module.exports = mongoose.model('Comment', commentSchema);
