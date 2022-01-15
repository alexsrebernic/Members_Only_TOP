var mongoose = require('mongoose');
const { DateTime } = require("luxon");
var Schema = mongoose.Schema;

var UserSchema = new Schema(
  {
    username: {type: String, required: true, maxLength: 25},
    password: {type:String,required:true},
    profileImg:{type:String,required:true},
    isMember: {type:Boolean,required:true},
    isAdmin:{type:Boolean,required:true}
  }
);
module.exports = mongoose.model('User', UserSchema);
