const Message = require("../models/messages")
const User = require("../models/user")
var async = require('async');
const moment = require("moment")
var reverseArray = require('reverse-array');
exports.message_board_get = function(req,res,next){
     async.parallel({
         messages:function(callback){
             Message.find()
             .populate('user')
             .exec(callback)
         }
     },function(err,results ) {
        if(err)return next(err)
        res.render('index', { title: '.members-only: Message Board', user:req.user,array_of_messages:reverseArray(results.messages) });
     })

}

exports.message_board_post = function(req,res,next){
    if(req.user){
        let date = new Date()
     let message = new Message({
        title: req.body.title,
        details:req.body.details,
        user: req.user.id,
        date: moment().format('MMMM Do YYYY, h:mm:ss a') 
     }).save( err => {
         if (err) next(err)
        res.redirect("/")
     })

    }
}