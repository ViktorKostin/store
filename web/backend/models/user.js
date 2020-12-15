var mongoose = require('mongoose');
var db = require('./db');

var schema = db.Schema({
  email: String,
  password: String,
  roles: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Role"
    }
  ]
});
var User = db.model("User", schema);

module.exports = User;