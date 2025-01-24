const mongoose=require('mongoose');

//define the mongo db URL
const mongoURL='mongodb://localhost:27017/hotels';

//Set Up mongo db connection
mongoose.connect(mongoURL,{
    useNewUrlParser:true
})

const db = mongoose.connection;

db.on('connected',()=>{
    console.log('Connected to mongodb server');
})

db.on('error',(err)=>{
    console.error('MongoDB Connection Error');
})

db.on('disconnected',()=>{
    console.log('MongoDB Disconnected');
})

module.exports=db