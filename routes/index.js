var express = require('express');
var app = express.Router();
var fs=require('fs');
var passport = require('passport');
var Strategy = require('passport-local').Strategy;
var data=require('./data');
var db=require('./db');

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
		db.projectpush(req.body);
		res.render('adminproject');
})

app.get('/edit/achive',function(req,res){
	res.render('adminachive');
})

app.post('/edit/achive',function(req,res){
	db.achivepush(req.body);
	res.render('adminachive');
})

app.get('/edit/placement',function(req,res){
	res.render('editplacement');
})

app.post('/edit/placement',function(req,res){
	console.log(req.body);
	db.placementpush(req.body);
	res.render('editplacement');
})

app.get('/edit/workshop',function(req,res){
	res.render('editworkshop');
})

app.post('/edit/workshop',function(req,res){
	db.workshoppush(req.body);
	res.render('editworkshop');
})

app.get('/edit/student',function(req,res){
	res.render('editstudent');
})

app.post('/edit/student',function(req,res){
	db.studentpush(req.body);
	res.render('editstudent');
})

app.get('/projects',function(req,res){
	db.getproject(function(err,docs){
		if(err){
			console.log(err);
		}
		else{
			console.log(docs);
			res.render('project',{data:docs});		
		}
	})
	
})

app.get('/achive',function(req,res){
	db.getachive(function(err,docs){
		if(err){
			console.log(err);
		}
		else{
			console.log(docs);
			res.render('achive',{data:docs});
		}
	})
})


app.get('/workshop',function(req,res){
	db.getworkshop(function(err,docs){
		if(err){
			console.log(err);
		}
		else{
			console.log(docs);
			res.render('workshop',{data:docs});
		}
	})
	
})

app.get('/student',function(req,res){
	db.getstudent(function(err,docs){
		if(err){
			console.log(err);
		}
		else{
			console.log(docs);
			res.render('student',{data:docs});
		}
	})
	
})

app.get('/placement',function(req,res){
	db.getplacement(function(err,docs){
		if(err){
			console.log(err);
		}
		else{
			console.log(docs);
			res.render('placement',{data:docs});
		}
	})
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