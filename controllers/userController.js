const User = require("../models/user")
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require('bcryptjs')
const { body,validationResult } = require('express-validator');


exports.user_sign_up_get = function (req,res,next){
    res.render('sign_up',{title:".members-only: Sign Up"})
}

exports.user_sign_up_post = function(req,res,next){
    if(req.body.username.length >= 25) return res.status(400).render('sign_up',{title:".members-only: Sign Up",error_message:"The username is too long!"})
    User.findOne({username:req.body.username},function (err,user){
        if(err){
            next(err)
        }
        if(user){
             return res.status(400).render('sign_up',{title:".members-only: Sign Up",error_message:"The username is already used!"})
        } else {
            if(req.body.password === req.body.passwordreconfirm){
              bcrypt.hash(req.body.password, 10, (err, hashedPassword) => {
                if(err){
                  next(err)
                }
                const user = new User({
                  username: req.body.username,
                  password: hashedPassword,
                  messages: [],
                  profileImg: `https://ui-avatars.com/api/?name=${req.body.username}`,
                  isMember: false
                }).save(err => {
                  if (err) { 
                    return next(err);
                  }
                  res.redirect("/");
                });
              });
               
            } else {
                return res.status(400).render('sign_up',{title:".members-only: Sign Up",error_message:"The password's must be equal!"})
            }
        }
    })
}
exports.user_log_in_get = function(req,res,next){
    res.render('log_in' ,{title:".members-only: Log in",message:req.flash().error})
}
exports.user_log_in_post = passport.authenticate("local", {
  successRedirect: "/",
  failureRedirect: "/log_in",
  failureFlash : true
})

exports.user_log_out_get = function(req,res){
    req.logout();
    res.redirect("/");

}


passport.use(
  new LocalStrategy((username, password, done) => {
    User.findOne({ username: username }, (err, user) => {
      if (err) { 
        return done(err);
      }
      if (!user) {
        return done(null, false, { message: "Incorrect username" });
      }
      bcrypt.compare(password, user.password, (err, res) => {
        if(err){console.log(err)}
        if (res) {
          return done(null, user)
        } else {
          return done(null, false, { message: "Incorrect password" })
        }
      })
    });
  })
);
passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  User.findById(id, function(err, user) {
    done(err, user);
  });
});