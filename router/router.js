require('./models/Users');
const express = require('express');

const mongoose = require('mongoose');

const bodyParser = require('body-parser');

const authentication = require('./authentication');


const app = express();

app.use(bodyParser.json());

app.use(authentication);



const mongoUri = 'mongodb+srv://user:123@cluster0.1ozdh.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'

mongoose.connect(mongoUri, 
    async(err)=>{
        if(err) throw err;
        console.log("conncted to db")
    
});

mongoose.connection.on('connected', () => {
    console.log('connected to mongo instance');
});

mongoose.connection.on('error', (err) => {
    console.log('errors with connecting to mongoDB',err)
});

app.get('/',(req,res) => {
res.send('Hi there!');
});

app.listen(3000,()=>{
console.log('Listening on port 3000');
});