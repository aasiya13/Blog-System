var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var expressValidator = require('express-validator');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var bodyParser = require('body-parser');
var mongo = require('mongodb');
var db = require('monk')('localhost/nodeblog');
var multer = require('multer');
var flash = require('connect-flash');

var index = require('./routes/index');
var posts = require('./routes/posts');

var app = express();
app.locals.moment = require('moment');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

//Handle file uploads & Multipart Data
var upload = multer({dest : './public/images/uploads'});


// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

// express session
app.use(session({
  secret: 'secret',
  saveUninitialized: true,
  resave : true
}));

// express validator
app.use(expressValidator({
  errorFormatter : function(param, msg, value){
    var namespace = param.split("."),
    root = namespace.shift(),
    formParam = root;
    while(namespace.length){
      formParam += '[' + message.shift() + ']';
    }
    return{
      param : formParam,
      msg : msg,
      value : value
    };
  }
}));
app.use(express.static(path.join(__dirname, 'public')));

// connct flash
app.use(flash());
app.use(function(req, res, next){
  res.locals.messages = require('express-messages')(req,res);
  next();
});

// make db accessible to router
app.use(function(req,res,next){
  req.db = db;
  next();
});

app.use('/', index);
app.use('/posts', posts);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
