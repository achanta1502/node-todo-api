var mongoose = require('mongoose');
mongoose.Promise=global.Promise;
var URI=mongodb://achanta:qwerty123@ds143932.mlab.com:43932/todo-app-api
mongoose.connect(process.env.URI || 'mongodb://localhost:27017/TodoApp');

module.exports = {mongoose};
