var db = require('./db');

var schema = db.Schema({
  title: String,
  description: String,
  price: Number,
  sizes: [Number],
  image: String
},
{
  timestamps: {
  	createdAt: 'created_at',
  	updatedAt: 'updated_at'
  }
});
var Product = db.model("Product", schema);

module.exports = Product;