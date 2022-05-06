require('./models/Users');

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const authentication = require('./authentication');

// add this
const message = require('./messages/messages');


const app = express();

const cors = require('cors')
app.use(cors())

app.use(bodyParser.json());

app.use(authentication);

const mongoUri = 'mongodb+srv://user:123@cluster0.1ozdh.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'

mongoose.connect(mongoUri,
    async (err) => {
        if (err) throw err;
        console.log("conncted to db")

    });

mongoose.connection.on('connected', () => {
    console.log('connected to mongo instance');
});

mongoose.connection.on('error', (err) => {
    console.log('errors with connecting to mongoDB', err)
});

// add message and change send 
app.get('/', message, (req, res) => {
    res.send('your email: $ { req.user.email}');
});

const server = require('http').createServer(app);
const PORT = 50001
const io = require('socket.io')(server, {
    cors: {
        origin: 'http://localhost:5000',
        methods: ['GET', 'POST']
    }
})

server.listen(PORT, () => {
    console.log('listening to port', PORT)
})
