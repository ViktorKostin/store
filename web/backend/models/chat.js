var mongoose = require('mongoose');
var db = require('./db');

var schema = db.Schema({
  user: String,
  messages: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Message"
  }],
}, {
  versionKey: false,
});
var Chat = db.model("Chat", schema);

module.exports = Chat;