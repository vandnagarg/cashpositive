var passport = require('passport');
var User = require('../models/user');
var LocalStratergy = require('passport-local').Strategy;

passport.serializeUser(function(user,done) // how to store user in the session
{
    // here user is the input and done is the callback
    done(null,user.id);  //whenever u want to store the session store it via user id
});

passport.deserializeUser(function(id,done)
{
    User.findById(id,function(err,user)
    {
        done(err,user);
    });
});

passport.use('local.signup',new LocalStratergy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback:true
},function (req,email,password,done) {
    req.checkBody('email','Invalid email').notEmpty().isEmail();
    req.checkBody('password','Invalid password').notEmpty().isLength({min:4});
    var errors = req.validationErrors();
    if(errors){
        var messages  =[];
        errors.forEach((function (error) {
            messages.push(error.msg);
        }));
        return done(null,false,req.flash('error',messages));
    }   

    User.findOne({'email' : email},function(err,user)
    {
        if(err)
                return done(err);
        if(user)
        {
            return done(null,false,{message:'Email is already in use;'})
            //false to tell it is not succssful
        }
        var newUser = new User();
        newUser.email = email;
        newUser.password = newUser.encryptPassword(password);
        newUser.save(function(err,result)
        {
            if(err)
            {
                return done(err);
            }
            return done(null,newUser);

        })

    })
}));
