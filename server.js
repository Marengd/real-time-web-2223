require('dotenv').config();

// Nodige modules importeren
const fs = require('fs'); // Module om met het bestandssysteem te werken
const path = require('path'); 
const express = require('express'); 
const app = express(); 
const server = require('http').createServer(app); 
const io = require('socket.io')(server); 
const axios = require('axios'); // HTTP client voor het maken van requests naar externe API's

const routes = require('./routes/routes');

app.set('view engine', 'ejs');

app.use(express.static('public'));

app.use('/', routes);

const initializeSocket = require('./socket');
initializeSocket(io);

const port = process.env.PORT || 3000;

server.listen(port, '0.0.0.0', () => {
  console.log(`Server listening on port ${port}`); 
});
