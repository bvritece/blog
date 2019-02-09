var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var hbs=require('express-handlebars');
var session = require('express-session');
var passport = require('passport');
var flash = require('connect-flash');

var app= express();


var routes = require('./routes/index');

//middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//engine
app.engine('hbs',hbs({extname:'hbs',defaultLayout:'error',layoutsDir:__dirname+'/views'}));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

//middleware
app.use(session({
    secret: 'secret',
    saveUninitialized: true,
    resave: true
}));

// Passport init
app.use(passport.initialize());
app.use(passport.session());

app.use(flash());

// Global Vars
app.use(function (req, res, next) {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error = req.flash('error');
  res.locals.user = req.user || null;
  next();
});


app.use('/', routes);
app.listen(5000, () => console.log(`Listening on 5000`));
