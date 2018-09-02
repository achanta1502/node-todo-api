// const MongoClient=require('mongodb').MongoClient;
const {MongoClient,ObjectID}=require('mongodb');

// var obj= new ObjectID();
// console.log(obj);
// var user={name:"achanta",age:25};
// var {name}=user;
// console.log(name);
MongoClient.connect('mongodb://localhost:27017/TodoApp',(err,client)=>{
if(err){
    return console.log('Unable to connect to mongodb server');
}
console.log('mongodb server connected!');
// const db=client.db('TodoApp');
// db.collection('Todos').insertOne({
//   text:"some to do",
//   completed: false
// },(err,result)=>{
//   if(err){
//     console.log('Unable to insert',err);
//   }
//   console.log(JSON.stringify(result.ops,undefined,2));
// });
// const db=client.db('TodoApp');
// db.collection('Users').insertOne({
//
// name:'pavan Achanta',
// age:'23',
// location:'dallas '
// },(err,result)=>{
//   if(err){
//     console.log('Unable to insert',err);
//   }
//   //console.log(JSON.stringify(result.ops,undefined,2));
//   console.log(result.ops[0]._id.getTimestamp());
// });
client.close();
});
