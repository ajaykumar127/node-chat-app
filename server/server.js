const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const publicPath = path.join(__dirname, '/../public');
const PORT = process.env.PORT || 3000;
var app = express();
var server = http.createServer(app);
var io = socketIO(server);

app.use(express.static(publicPath));

io.on('connection', (socket) => {
  console.log('new user connected');

  socket.emit('newMessage', {
    from: 'A.N. Owen',
    text: "Testing, testing, 1-2-3",
    createdAt: Date.now()
  });

  // listen for new messages FROM clients, emit them back TO clients
  socket.on('createMessage', (message) => {
    console.log('Msg from client', message);
    socket.emit('newMessage', {
      from: message.from,
      text: message.text,
      createdAt: Date.now()
    });
  })

  socket.on('disconnect', (socket) => {
    console.log('User was disconnected');
  });
});


server.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
