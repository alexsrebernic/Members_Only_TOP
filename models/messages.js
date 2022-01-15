const mongoose = require('mongoose');
const { DateTime } = require("luxon");
const Schema = mongoose.Schema;

var messageSchema = new Schema(
  {
    title: {type: String, required: true, maxLength: 30},
    details: {type: String, required: true, maxLength: 60},
    user: {type: Schema.Types.ObjectId, ref: 'User', required: true},
    date:{type:String,required:true}
  }
);

module.exports = mongoose.model('Message', messageSchema);
