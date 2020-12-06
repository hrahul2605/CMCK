import express from 'express';
import cors from 'cors';
import { createServer } from 'http';
import { Socket } from 'socket.io';
import path from 'path';

const app = express();
const server = createServer(app);
app.use(cors());

const PORT = process.env.PORT || 5000;

app.use(express.static(path.join(__dirname, 'build')));
const io = require('socket.io')(server);

io.on('connection', (socket: Socket) => {
  let roomID = '';
  let userName = '';

  // join user to particular room
  socket.on('joinRoom', (arg) => {
    roomID = arg.roomID;
    userName = arg.userName;

    socket.join(roomID);
    socket.to(roomID).emit('userJoined', userName);
  });

  // any message
  socket.on('message', (message) => {
    socket.to(roomID).emit('message', message);
  });

  // chat between users
  socket.on('chat', (data) => {
    socket.to(roomID).emit('chat', data);
  });

  // detect changes in code
  socket.on('code', (data) => {
    socket.to(roomID).emit('code', data);
  });

  // detect change in code language
  socket.on('langChange', (data) => {
    socket.to(roomID).emit('langChange', data);
  });

  // user disconnects
  socket.on('disconnect', () => {
    socket.to(roomID).emit('userDisconnect', userName);
  });
});

app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

server.listen(PORT, () => {
  console.log(`Server listening on Port ${PORT}`);
});
