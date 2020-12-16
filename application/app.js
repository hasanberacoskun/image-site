var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var sessions = require('express-session');
var mysqlSession = require('express-mysql-session')(sessions);

var handlebars = require('express-handlebars');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var postsRouter = require('./routes/posts');

var errorPrint = require('./helpers/debug/debugprinters').errorPrint;
var successPrint = require('./helpers/debug/debugprinters').successPrint;
var requestPrint = require('./helpers/debug/debugprinters').requestPrint;
var app = express();

var flash = require('express-flash');

app.engine(
  "hbs",
  handlebars({
      layoutsDir: path.join(__dirname, "views/layouts"),
      partialsDir: path.join(__dirname, "views/partials"),
      extname: ".hbs",
      defaultLayout: "home",
      helpers: {
        notEmptyObject: (obj) => {
          return !(obj.constructor === Object && Object.keys(obj).length == 0);
        }
      }
  })
);

// creating session
var mysqlSessionStore = new mysqlSession({/* using default options */},require('./config/database'));
app.use(sessions({
  key: "csid",
  secret: "I don't like sand. It's coarse and rough and irritating and it gets everywhere.",
  store: mysqlSessionStore,
  resave: true,
  saveUninitialized: false
}));

// create a middleware for logout button persistence
app.use((req, res, next) => {
  if(req.session.username) {
    res.locals.logged = true;
  }
  next();
});

app.use(flash());

app.set("view engine", "hbs");

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use("/public", express.static(path.join(__dirname, 'public')));

app.use((req, res, next) => {
  requestPrint(req.url);
  next();
});

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/posts', postsRouter);

app.use((err, req, res, next) => {
  res.status(500);
  res.send('something went wrong with your db: ' + err);
})

app.use((err, req, res, next) => {
  console.log(err);
  res.render('error', {err_message: err});
});

module.exports = app;
