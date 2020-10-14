var mongoose = require("mongoose");
var Comment   = require("./models/comment");

function deleteComment(){

  Comment.deleteMany({}, function(err) {
      if(err){
          console.log(err);
      }
      console.log("removed comments!");
    });
  }
module.exports = deleteComment;
