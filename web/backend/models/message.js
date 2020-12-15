var mongoose = require('mongoose');
var db = require('./db');

var schema = db.Schema({
  user: String,
  message: String,
}, {
  versionKey: false,
});
var Message = db.model("Message", schema);

module.exports = Message;