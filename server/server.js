var env=process.env.NODE_ENV || 'development';

console.log('env ****',env);
if(env==='development'){
  process.env.PORT=3000;
  process.env.MONGODB_URI = 'mongodb://localhost:27017/TodoApp'
}else if(env==='test'){
  process.env.PORT=3000;
  process.env.MONGODB_URI = 'mongodb://localhost:27017/TodoAppTest'
}
const express = require('express');
const _ = require('lodash');
const bodyParser = require('body-parser');
const {mongoose} =require('./db/mongoose');
const {Todo}=require('./models/todo');
const {User}=require('./models/user');
const {ObjectID}=require('mongodb');
var {authenticate}=require('./middleware/authenticate');
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
app.patch('/todos/:id',(req,res)=>{
  var id=req.params.id;
  var body = _.pick(req.body,['text','completed']);
  if(!ObjectID.isValid(id)){
    return res.status(404).send();
  }
  if(_.isBoolean(body.completed) && body.completed){
    body.completedAt =new Date().getTime();
  }else{
    body.completed=false;
    body.completedAt=null;
  }
Todo.findByIdAndUpdate(id,{$set: body},{new: true}).then((todo)=>{
  if(!todo){
    res.status(404).send();
  }
  res.send({todo});
}).catch((e)=>{
  res.status(400).send();
});

});

app.post('/users',(req,res)=>{
var body=_.pick(req.body,['email','password']);
var user=new User(body);

user.save().then(( )=>{
  var token=user.generateAuthToken();
  console.log(token);
  return token;
  //res.send(user);
}).then((token)=>{
  res.header('x-auth',token).send(user);
  console.log("header x-auth",token);
}).catch((e)=>{
  res.status(400).send(e);
})
}


);


app.get('/users/me',authenticate,(req,res)=>{
res.send(req.user);}
);
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
