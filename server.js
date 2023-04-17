// Import required modules
const express = require('express');
const http = require('http');
const path = require('path');
const socketIO = require('socket.io');

// Create an Express application and an HTTP server
const app = express();
const server = http.createServer(app);
const io = socketIO(server);
const port = process.env.PORT || 1010;

const routes = require("./routes/routes");


// Set the view engine to EJS and configure the views directory
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));


// Serve static files (CSS, JavaScript, images, etc.) from the public folder
app.use(express.static(path.resolve('public')));


// Use the routes in the Express app
app.use(routes);


// Define chat history variables
const historySize = 50;
let history = [];


// Handle socket connections and disconnections
io.on('connection', (socket) => {
  // Get the user's name from the session storage
  const userName = socket.handshake.query.userName || "anonymous";
  console.log(`${userName} connected`);

  // Send the "user joined" message to all connected clients
  io.emit('user-connected', `${userName} joined the chat.`);

  io.emit('history', history);

  socket.on('message', (message) => {
    // Keep the chat history to the specified size
    while (history.length > historySize) {
      history.shift();
    }
    history.push(message);

    // Emit the message to all connected clients
    io.emit('message', message);
  });


  socket.on('disconnect', () => {
    console.log('user disconnected');

    // Send the "user disconnected" message to all connected clients
    io.emit('user-disconnected', `${userName} left the chat`);
  });
});


// Start the HTTP server on the specified port
server.listen(port, () => {
  console.log('listening on port ', port);
});
