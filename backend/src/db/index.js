const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/projAPI');
mongoose.Promise = global.Promise;

module.exports = mongoose;