require('app-module-path').addPath(__dirname);
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var bodyParser = require('body-parser');
const http = require('http');
const settings= require("./config/settings");

var mongoose= require('mongoose');


// var indexRouter = require('./routes/index');
// var usersRouter = require('./routes/users');
 var authrouter = require('./app/web-route');
 var apirouter = require('./app/api-route');

var app = express();
const server = http.createServer(app);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/assets',express.static('custom_public'));
// DB connection
var url="mongodb://localhost:27017/chatdb";
mongoose.connect(url,function(err){
  if(err){
    console.log("error");
  }else{
    console.log("db connected");
  }
},{
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false,
});
// app.use('/', indexRouter);
// app.use('/users', usersRouter);
app.use('/',authrouter);
app.use('/api',apirouter);
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
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

const PORT = settings.port || 3000;

var chat_listen= server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
require('customchat').launchChat(chat_listen);
module.exports = app;
