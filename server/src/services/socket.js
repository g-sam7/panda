const { Server } = require('socket.io');

const createIo = (server) => new Server(server, {
  cors: {
    origin: ['http://localhost:3001'],
    credentials: true,
  },
});

const setupSocketEvents = (io) => {
  const connectedUsers = {};

  io.on('connection', (socket) => {
    socket.on('user-connected', (user) => {
      connectedUsers[socket.id] = user;
    });

    socket.on('message', (data) => {
      console.log('Message received:', data);
      io.emit('message', data);
    });

    socket.on('disconnect', () => {
      delete connectedUsers[socket.id];
    });
  });
};

module.exports = { createIo, setupSocketEvents };
