var mongoose = require('mongoose');

const { MONGO_HOSTNAME } = process.env;

mongoose.connect(`mongodb://${MONGO_HOSTNAME}:27017/store`, { useNewUrlParser: true, useUnifiedTopology: true});

module.exports = mongoose;