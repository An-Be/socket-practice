const express = require('express');
const app = express();
//create http server
const http = require('http');
const cors = require('cors');

const { Server } = require('socket.io');

app.use(cors());

//use http server with express
const server = http.createServer(app);

//create socket server - created new instance of class and pass our server
//pass cors options
const io = new Server(server, {
    cors: {
        origin: 'http://localhost:3000',
        methods: ['GET', 'POST']
    },
    });

//listen to events from socket
//connection event triggers when user opens site
io.on('connection', (socket) => {
    console.log(`User Connected: ${socket.id}`)

    //code so user can join a room
    socket.on('join_room', (data) => {
        socket.join(data);
    });

    socket.on('send_message', (data) =>{
        socket.to(data.room).emit('receive_message', data)
    });
});

//listen for connection
server.listen(3001, () => {
    console.log(`Server is now running on port 3001`);
});