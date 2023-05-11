require('dotenv').config();

const fs = require('fs');
const path = require('path');
const express = require('express');
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);
const axios = require('axios');

const routes = require('./routes/routes');

app.set('view engine', 'ejs');

app.use(express.static('public'));

app.use('/', routes);

const initializeSocket = require('./socket');
initializeSocket(io);

server.listen(3000, () => {
  console.log('Server listening on port 3000');
});
