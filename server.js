// entry
const express = require('express');
const router = require('./router/router');
const bodyParser = require('body-parser');
const http = require('http');
const cors = require('cors');

// db
const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
mongoose.connect('mongodb://localhost/dashboard');

// app
const app = express();
app.use(cors());
app.use(bodyParser.json({type: '*/*'}));

// server settings
const port = process.env.PORT || 3092;
const server = http.createServer(app);

const io = require('socket.io')(server);
router(app, io);
// io.sockets.on('connection', (socket) => {
//   console.log('a user connected');
//   // socket.emit('hi', 'Hello Frontend!');
// });
server.listen(port, (err) => {
  if (err) {
    console.log('error in server: ', err);
  } else {
    console.log('app listening on port: ', port);
  }
});
