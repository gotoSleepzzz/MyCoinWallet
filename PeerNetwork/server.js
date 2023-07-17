const express = require('express');
const http = require('http');
const socketIO = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

// Set up a route handler for the root URL
app.get('/', (req, res) => {
  res.send('Socket server is running.');
});

app.get('/connections', (req, res) => {
  const connectedClients = [];

  // Iterate over all connected sockets
  Object.keys(io.sockets.sockets).forEach((socketId) => {
    const socket = io.sockets.sockets[socketId];

    // Extract relevant data about the client
    const clientData = {
      socketId: socketId,
      ipAddress: socket.handshake.address,
      userAgent: socket.handshake.headers['user-agent'],
      // Add more relevant properties as needed
    };

    connectedClients.push(clientData);
  });

  res.json(connectedClients);
});

// Socket.IO connection event handler
io.on('connection', (socket) => {
  console.log('A client has connected.');

  // Handle 'message' events
  socket.on('message', (data) => {
    console.log('Received message:', data);

    // Broadcast the received message to all connected clients
    io.emit('message', data);
  });

  // Handle 'disconnect' events
  socket.on('disconnect', () => {
    console.log('A client has disconnected.');
  });
});

// Start the server
const expressPort = 5000;
app.listen(expressPort, () => {
  console.log(`Express server is listening on port ${expressPort}`);
});

// Start the Socket.IO server
const socketIOPort = 4000;
server.listen(socketIOPort, () => {
  console.log(`Socket.IO server is listening on port ${socketIOPort}`);
});
