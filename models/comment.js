var mongoose = require('mongoose');

// SCHEMA setup
var Schema = mongoose.Schema;
var commentSchema = new Schema({
  text: String,
  author: String
});

module.exports = mongoose.model('Comment', commentSchema);
