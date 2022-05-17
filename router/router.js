require('./models/Users');
require('./models/Message');
require('./models/interestGroup');
require('./models/Events');
require('../router/models/Suggestion');
const express = require('express');

const mongoose = require('mongoose');

const bodyParser = require('body-parser');

const authentication = require('./authentication');

// add this
const message = require('./messages/messages');
const Messages = require('./Messagerouters');
const interests = require('./ChatRouters');
const events = require('./EventRouters');
const suggestion = require("./SuggestionRouters");

const app = express();

const cors = require('cors')
app.use(cors())

app.use(bodyParser.json());

app.use(authentication);
app.use('/api/Messages',Messages);
app.use('/api/interests',interests);
app.use('/api/events', events)
app.use('/api/suggestions', suggestion);

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

// add message and change send 
app.get('/', message,(req,res) => {
res.send('your email: $ { req.user.email}');
}); 

const server =app.listen(3000,()=>{
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