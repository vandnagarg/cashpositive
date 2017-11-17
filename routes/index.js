var express = require('express');
var router = express.Router();
var csrf  =require('csurf');

var Event = require('../models/event');


var csrfProtection = csrf();

router.use(csrfProtection);
/* GET home page. */
router.get('/users/logout',isLoggedIn, function (req,res,next) {
    req.logout();
    res.redirect('/');
})
router.get('/',notLoggedIn,function (req,res,next) {
    next();
});
router.get('/', function(req, res, next) {
	Event.find(function(err,docs){
		var EventChunks =[];
		var chunkSize = 3;
		for(var i=0;i<docs.length;i+=chunkSize){
			EventChunks.push(docs.slice(i,i+chunkSize));
		}
		res.render('./event/index',{title:'Event Manager',events:EventChunks});
	});

});
router.get('/users/signup', function(req, res, next) {
	var messages = req.flash('error');

    res.render('users/signup',{csrfToken: req.csrfToken(),messages:messages,hasErrors:messages.length>0})
});

router.post('/users/signup',passport.authenticate('local.signup',{
    successRedirect:'/users/profile',
    failureRedirect:'/users/signup',
    failureFlash:true
}),function (req,res,next) {  // this will act ss middleware which will run only after above are true
    
        req.redirect('/users/profile');    // if we are not coming from checkout page bt actually logging in
   
});

router.get('/users/signin',function (req,res,next) {
    var messages = req.flash('error');
    res.render('users/signin',{csrfToken: req.csrfToken(),messages:messages,hasErrors:messages.length>0})

});
router.post('/users/signin',passport.authenticate('local.signin', {
   // successRedirect:'/user/profile',
    failureRedirect:'/users/signin',
    failureFlash:true
}),function (req,res,next) {  // this will act ss middleware which will run only after above are true
   
        res.redirect('/users/profile');    // if we are not coming from checkout page bt actually logging in
    

});

function isLoggedIn(req,res,next)
{
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect(('/'))

}
function notLoggedIn(req,res,next)
{
    if(!req.isAuthenticated()){
        return next();
    }
    res.redirect(('/'))

}


module.exports = router;
