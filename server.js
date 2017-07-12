// entry
const express = require('express');
const router = require('./router/router');
const bodyParser = require('body-parser');
const http = require('http');
const cors = require('cors');

// db
const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
// local app
// mongoose.connect('mongodb://localhost/dashboard');

// live app
mongoose.connect('mongodb://thekho:thekho@ds155582.mlab.com:55582/dashboard-app');

// app
const app = express();
app.use(cors());
app.use(bodyParser.json({type: '*/*'}));

// server settings
const port = process.env.PORT || 3092;
const server = http.createServer(app);

const io = require('socket.io')(server);
const UserData = require('./models/userData');
io.sockets.on('connection', (socket) => {
  // websockets synced ~
  // on add data
  app.post('/api/user-data', (req, res, next) => {
    const gender = req.body.gender;
    const locale = req.body.locale;
    const profilePhoto = req.body.profilePhoto;
    const timezone = req.body.timezone;
    const lat = req.body.lat;
    const long = req.body.long;

    if (!gender || !locale || !profilePhoto || !timezone || !lat || !long) {
      return res.status(422).send({error: 'gender, locale, profilePhoto, timezone, lat and long are all required'});
    }
    const newUserData = new UserData({gender, locale, profilePhoto, timezone, lat, long});
    newUserData.save((err) => {
      if (err) {
        return next(err);
      }
      // socket emit
      socket.broadcast.emit('db updated', 'db updated');
      return res.send(newUserData);
    });
  });
  // on update data
  app.put('/api/id/:_id', (req, res, next) => {
    const id = req.params._id;
    const gender = req.body.gender;
    const locale = req.body.locale;
    const profilePhoto = req.body.profilePhoto;
    const timezone = req.body.timezone;
    const lat = req.body.lat;
    const long = req.body.long;

    if (!gender || !locale || !profilePhoto || !timezone || !lat || !long) {
      return res.status(422).send({error: 'entry text and author are required'});
    }
    UserData.findOneAndUpdate({_id: id}, {$set: {gender, locale, profilePhoto, timezone, lat, long}}, {new: true}, (err, entry) => {
      if (!entry) {
        return res.status(422).send({error: 'entry with given id does not exist'});
      }
      if (err) {
        return next(err);
      }
      // socket emit
      socket.broadcast.emit('db updated', 'db updated');
      return res.send(entry);
    });
  });
  // on delete data
  app.delete('/api/id/:_id', (req, res, next) => {
    const id = req.params._id;
    UserData.find({_id: id}).remove().exec((err, entry) => {
      if (err) {
        return next(err);
      } else {
        // socket emit
        socket.broadcast.emit('db updated', 'db updated');
        res.send('entry was removed. . .');
      }
    });
  });
});

router(app);

server.listen(port, (err) => {
  if (err) {
    console.log('error in server: ', err);
  } else {
    console.log('app listening on port: ', port);
  }
});
