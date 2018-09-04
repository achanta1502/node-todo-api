const express = require('express');
const bodyParser = require('body-parser');
var {mongoose} =require('./db/mongoose');
var {Todo}=require('./models/todo');
var {User}=require('./models/user');
const {ObjectID}=require('mongodb');
var app=express();

const port=process.env.PORT || 3000;
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

app.get('/todos',(req,res)=>{
  Todo.find().then((todos)=>{
    res.send({todos});
  },(e)=>{
    res.status(400).send(e);
  })
});
app.get('/todos/:id',(req,res)=>{
  var id=req.params.id;
  if(!ObjectID.isValid(id)){
    console.log('Id is invalid');
    return res.status(404).send();
  }
  Todo.findById(id).then((todo)=>{
    if(!todo){
      return res.status(404).send();
    }
    res.send({todo});
  }).catch((e)=>{
    res.status(400).send(e);
  });


});
app.delete('/todos/:id',(req,res)=>{
  var id=req.params.id;
  if(!ObjectID.isValid(id)){
    return res.status(404).send();
  }
  Todo.findByIdAndRemove(id).then((todo)=>{
    if(!todo){
      return res.status(404).send();
    }
    res.send({todo});
  }).catch((e)=>{
    res.status(400).send(e);
  });
});
app.listen(port,()=>{
  console.log('starting on port +',port);
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
module.exports={app};
