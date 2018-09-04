const mongoose = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todo');
const {User} = require('./../server/models/user');
const {ObjectID}=require('mongodb');

Todo.remove({}).then((result)=>{
  console.log(result);
});
Todo.findByIdAndRemove("5b8dff35b92c47503dde6bcd").then((todo)=>{
console.log(todo);
});
