//This file is the starting point. Runs 'router.js' and goes line by line, top to bottom.
require('./models/Users');
require('./models/Message');
require('./models/interestGroup');
require('./models/Events');

const express = require('express');

const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const authentication = require('./authentication');
const dotenv = require('dotenv')
dotenv.config();

//defines all the 'Routers' that execute all routes for each feature
//ie. the Events feature will use an EventRouter that executes all the routes associated with events, EventRoute
const message = require('./messages/messages');
const Messages = require('./Messagerouters');
const interests = require('./ChatRouters');
const events = require('./EventRouters');

// BRING IN EVENT ROUTES
//const event_routes = require('../api/EventRoute');

const app = express();

const cors = require('cors')
// lines 24-28 should go in this order
app.use(cors())
app.use(bodyParser.json());
app.use(authentication);

app.use('/api/Messages',Messages);
app.use('/api/interests',interests); // 'interests' is the path from ChatRouters.js
app.use('/api/events', events);

//const mongoUri = 'mongodb+srv://user:123@cluster0.1ozdh.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'
const mongoUri = process.env.MONGODB_URI

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



//goes to each "Route" in the api folder, and runs all the functions/lines in each .~Route file
// app.use('/api/Messages',Messages);
// app.use('/api/interests',interests);
//app.use('/api/EventRoute', events); //'router' -> 'EventRouters.js' -> 'EventRoute.js'


// ------------------------------------------------>>>>>>>>>>>>>>>>>> use Event routes
//app.use('/api', event_routes);  //note: all event routes start at '/api', so define that here as the BASE


// add message and change send 
app.get('/', message,(req,res) => {
res.send('your email: $ { req.user.email}');
});

app.post("/response", (req, res) => {
    eventData(req.body);
    res.render("success", {title: req.body.title});
});

const PORT = process.env.PORT || 3000
const server = app.listen(3000,()=>{
    console.log('Listening on port 3000');
});

