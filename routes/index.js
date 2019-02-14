var express = require('express');
var app = express.Router();
var fs=require('fs');
var passport = require('passport');
var Strategy = require('passport-local').Strategy;
var data=require('./data');

app.get('/adminlogin',function(req,res){
    res.render('adminlogin');
})


app.post('/adminlogin',
  passport.authenticate('local', {successRedirect:'/edit', failureRedirect:'/adminlogin',failureFlash: true}),
  function(req, res) {
	  req.session.user=user;
    res.redirect('/edit');
  });

app.get('/edit', ensureAuthenticated, function(req, res)
{
    res.render('edit');
});

app.get('/',function(req,res){
	res.render('main');
})

app.get('/logout', function(req, res){
	req.logout();
    //req.flash('success_msg', 'You are logged out');
    res.redirect('/adminlogin');
});

app.get('/edit/project',function(req,res){
	res.render('adminproject');
})

app.post('/edit/project',function(req,res){
		var data=req.body;
		console.log(data);
		res.render('adminproject');
})

app.get('/edit/achive',function(req,res){
	res.render('adminachive');
})

app.post('/edit/achive',function(req,res){
	console.log(req.body);
	res.render('adminachive');
})

app.get('/edit/placement',function(req,res){
	res.render('editplacement');
})

app.post('/edit/placement',function(req,res){
	console.log(req.body);
	res.render('editplacement');
})

app.get('/edit/workshop',function(req,res){
	res.render('editworkshop');
})

app.post('/edit/workshop',function(req,res){
	console.log(req.body);
	res.render('editworkshop');
})

app.get('/edit/student',function(req,res){
	res.render('editstudent');
})

app.post('/edit/student',function(req,res){
	console.log(req.body);
	res.render('editstudent');
})

passport.use(new Strategy(
	function(username, password, cb) {
	  data.finduser(username, function(err, user) {
		if (err) { return cb(err); }
		if (!user) { return cb(null, false); }
		if (user.password != password) { return cb(null, false); }
		return cb(null, user);
	  });
	}));
  
  passport.serializeUser(function(user, cb) {
	cb(null, user.id);
  });
  
  passport.deserializeUser(function(id, cb) {
	data.findid(id, function (err, user) {
	  if (err) { return cb(err); }
	  cb(null, user);
	});
  });


function ensureAuthenticated(req, res, next){
	if(req.isAuthenticated()){
		return next();
	} else {
		res.redirect('/edit');
	}

}

module.exports = app;