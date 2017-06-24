var express = require('express');
var router = express.Router();
var mongo = require('mongodb');
var db = require('monk')('localhost/nodeblog');
// Home page Blog Posts
router.get('/', function(req, res, next) {
  var db = req.db;
  var posts = db.get('posts');  // specify the collection
// keep two empty curly braces
// not needed to pass conditions ,if it there it has to be mentioned
// the curly braces we need all posts
  posts.find({},{},function(err,posts){
    res.render('index', {
      "posts":posts
    });
  });

});

module.exports = router;
