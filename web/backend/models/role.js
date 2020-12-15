var db = require('./db');

var schema = db.Schema({
  name: String
});
var Role = db.model("Role", schema);

module.exports = Role;