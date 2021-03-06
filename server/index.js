import express from 'express';
import http from 'http';
import socketio from 'socket.io';
import cors from 'cors';
import router from './router.js';
import dotenv from 'dotenv';
import { addUser, getUser, removeUser, getUsersInRoom } from './users.js';
import  create  from './models/message.js';

const app = express();
const server = http.createServer(app);
const io = socketio(server);

app.use(router);
app.use(cors());
dotenv.config();

const PORT = process.env.PORT || 5000;

io.on('connection', (socket) => {

    socket.on('join', ({name, room}, callback) => {
        const { error, user } = addUser({id:socket.id, name, room});

        if(error) return callback(error);

        socket.join(user.room)
        socket.emit('message', {user:'admin', text: `${user.name}, welcome to the room ${user.room}`});
        socket.broadcast.to(user.room).emit('message', { user: 'admin', text: `${user.name}, has joined!`})
        io.to(user.room).emit('roomData', { room: user.room, users: getUsersInRoom(user.room)});

        callback()
    })

    socket.on('sendMessage', (message, callback)=>{
      
        const user = getUser(socket.id);
        create(user.name, user.room, message, () => {})
        io.to(user.room).emit('message', {user: user.name, text: message});
        io.to(user.room).emit('roomData', { room: user.room, users: getUsersInRoom(user.room)});
        callback();
    })

    socket.on('disconnect', () => {
        const user = removeUser(socket.id);
        if(user) {
          io.to(user.room).emit('message', { user: 'Admin', text: `${user.name} has left.` });
          io.to(user.room).emit('roomData', { room: user.room, users: getUsersInRoom(user.room)});
        }
      })
})



server.listen(PORT, () => console.log(`Server has started on port ${PORT}`));