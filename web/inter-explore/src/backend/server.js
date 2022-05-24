require('./models/Users');

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const authentication = require('./routers/authentication');

const app = express();

const cors = require('cors')
app.use(cors())
app.use(bodyParser.json());

app.use(authentication);

const mongoUri = 'mongodb+srv://user:123@cluster0.1ozdh.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'

//Connect to our database
mongoose.connect(mongoUri,
    async(err)=>{
        if(err) throw err;
        console.log("conncted to db")

});

//A listener to let us know if database connection was successful
mongoose.connection.on('connected', () => {
    console.log('Connected to mongo instance!!!');
});

//If can't connect, will show us an error message on console.
mongoose.connection.on('error', (err) => {
    console.log('Errors connecting to mongoDB :(',err)
});

app.get('/',(req,res) => {
    res.send('your email: $ { req.user.email}');
    });
    
    
    app.post("/response", (req, res) => {
        eventData(req.body);
        res.render("success", {title: req.body.title});
    });
    
    const server = app.listen(3000,()=>{
        console.log('Listening on port 3000');
    });