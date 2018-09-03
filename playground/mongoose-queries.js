const mongoose = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todo');
const {User} = require('./../server/models/user');
const {ObjectID}=require('mongodb');
var id='5b8cd5b841a1f12d14a85f95';
var user_id="5b8ca375d036e414f452dfe1";
// if(!ObjectID.isValid(id)){
//   console.log('ID not valid');
// }
// Todo.find({
//   _id: id
// }).then((todos)=>{
//   console.log("Todos",todos);
// });
//
// Todo.findOne({
//   _id: id
// }).then((todo)=>{
//   console.log("Todos",todo);
// });
// Todo.findById(id).then((todo)=>{
//   if(!todo){
//     return console.log('Id not found');
//   }
//   console.log("Todos by id",todo);
// }).catch((e)=>{
//   console.log(e);
// });
User.findById(user_id).then((user)=>{
  if(!user){
    return console.log('Id not found');
  }
  console.log("User by id",user);
}).catch((e)=>{
  console.log(e);
});
