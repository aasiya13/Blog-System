var express = require('express');
var router = express.Router();
var mongo = require('mongodb');
var db = require('monk')('localhost/nodeblog');

router.get('/add',function(req,res){
  res.render('addpost',{
    "title":"Add post"
  });
});
