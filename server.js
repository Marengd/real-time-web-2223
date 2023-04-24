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

// Handle socket connections and disconnections
io.on('connection', (socket) => {
  console.log('User connected');

  socket.on('disconnect', () => {
    console.log('User disconnected');
  });
});

// Handle server errors
server.on('error', (error) => {
  console.error(`Server error: ${error.message}`);
});

// Start the HTTP server on the specified port
server.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
