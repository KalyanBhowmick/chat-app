const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);

const { Server } = require('socket.io');
// const io = new Server(server);

const io = new Server({
    cors : {
        origin : "http://localhost:3001"
    }
})

app.get('/', (req, res) => {
res.sendFile(__dirname + '/index.html');
});

io.on('connection', (socket) => {
    console.log('a user connected');
    socket.on('disconnect', () => {
        console.log('user disconnected');
    });

    socket.on('chat message', (msg) => {
        console.log('message: ' + msg);
        io.emit('chat message', msg)
    });

    // socket.broadcast.emit("hi");
});


server.listen(5001, () => {
    console.log('Server is up and running');
});

io.listen(4000);