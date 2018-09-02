
const {MongoClient,ObjectID}=require('mongodb');


MongoClient.connect('mongodb://localhost:27017/TodoApp',(err,client)=>{
if(err){
    return console.log('Unable to connect to mongodb server');
}
console.log('mongodb server connected!');
 const db=client.db('TodoApp');
db.collection('Todos').deleteMany({text:'Eat lunc'}).then((result)=>{       //to delete the many data from mongodb
  console.log(result);
});
db.collection('Todos').deleteOne({text:'eat lunch'}).then((result)=>{       //to delete the data from mongodb
  console.log(result);
});
//find one and deleteOne

db.collection('Todos').findOneAndDelete({completed:false}).then((result)=>{
  console.log(result);
});
db.collection('Users').findOneAndDelete(new ObjectID('5b8c52abb59fda17e8767714')).then((result)=>{
  console.log(result);
});
db.collection('users').deleteMany({name:'pavan Achanta'}).then((result)=>{
  console.log(result);
});
client.close();
});
