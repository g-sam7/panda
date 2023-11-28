const http = require('http');
const app = require('./app');
const { createIo, setupSocketEvents } = require('./services/socket');

const port = process.env.PORT || 3000;
const server = http.createServer(app);

const io = createIo(server);
setupSocketEvents(io);

server.listen(port, () => {
  console.log(`Panda server listening on port ${port}`);
});
