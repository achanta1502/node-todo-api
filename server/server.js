const express = require('express');
const bodyParser = require('body-parser');
var {mongoose} =require('./db/mongoose');
var {Todo}=require('./models/todo');
var {User}=require('./models/user');

var app=express();
app.use(bodyParser.json())
app.post('/todos',(req,res)=>{
  var todo=new Todo({
    text: req.body.text
  });
  todo.save().then((doc)=>{
    res.send(doc);
  },(e)=>{
    res.status(400).send(e);
  });
});

app.listen(3000,()=>{
  console.log('starting on port 3000');
});
// var newTodo = new Todo(
//   {text:'  Edit      this video'}
// );
// newTodo.save().then((doc)=>{
//   console.log('saved todo',doc);
// },(e)=>{
//   console.log("unable to save",e);
// });

// var newUser =new User({email:'super@gmail.com'});
// newUser.save().then((doc)=>{
//   console.log('saved User',doc);
// },(e)=>{
//   console.log('unable to save',e);
// });
