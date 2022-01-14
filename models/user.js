var mongoose = require('mongoose');
const { DateTime } = require("luxon");
var Schema = mongoose.Schema;

var userSchema = new Schema(
  {
    username: {type: String, required: true, maxLength: 30},
    password: {type:String,required:true},
    isMember: {type:Boolean,required:true}
  }
);
module.exports = mongoose.model('User', userSchema);
