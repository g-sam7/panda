const http = require('http');
const app = require('./app');
const { Server } = require('socket.io');

const port = process.env.PORT || 3000;
const server = http.createServer(app);

const io = new Server(server, {
	cors: {
		origin: ['http://localhost:3001'],
		credentials: true,
	},
});

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

server.listen(port, () => {
  console.log(`Panda server listening on port ${port}`);
});
