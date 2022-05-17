//This file is the starting point. Runs 'router.js' and goes line by line, top to bottom.
require('./models/Users');
require('./models/Message');
require('./models/interestGroup');
require('./models/Events');
const express = require('express');

const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const authentication = require('./authentication');

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

const server = app.listen(3000,()=>{
    console.log('Listening on port 3000');
});

const io = require("socket.io")(server, {
   pingTimeout: 60000,
   cors: {
     origin: "http://localhost:3000",

   },
 });

 io.on("connection", (socket) => {
   console.log("Connected to socket.io");
   socket.on("setup", (userData) => {
     socket.join(userData._id);
     socket.emit("connected");
   });

   socket.on("join chat", (room) => {
     socket.join(room);
     console.log("User Joined Room: " + room);
   });
   socket.on("typing", (room) => socket.in(room).emit("typing"));
   socket.on("stop typing", (room) => socket.in(room).emit("stop typing"));

   socket.on("new message", (newMessageRecieved) => {
     var chat = newMessageRecieved.chat;

     if (!chat.users) return console.log("chat.users not defined");

     chat.users.forEach((user) => {
       if (user._id == newMessageRecieved.sender._id) return;

       socket.in(user._id).emit("message recieved", newMessageRecieved);
     });
   });

   socket.off("setup", () => {
     console.log("USER DISCONNECTED");
     socket.leave(userData._id);
   });
 });