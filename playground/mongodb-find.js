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
 const db=client.db('TodoApp');
// db.collection('Todos').find({
//   _id:new ObjectID('5b8c51c27801bb55c41012d')
// }).toArray().then((docs)=>{
// console.log('Todos');
// console.log(JSON.stringify(docs,undefined,2));
// },(err)=>{
//   console.log('Unable to fetch todos',err);
// });
db.collection('Todos').find().count().then((count)=>{
console.log(`Todos: ${count}`);

},(err)=>{
  console.log('Unable to fetch todos',err);
});

client.close();
});
