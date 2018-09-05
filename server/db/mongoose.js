var mongoose = require('mongoose');
mongoose.Promise=global.Promise;
//var app
mongoose.connect(process.env.MONGODB_URI);

module.exports = {mongoose};
