const entry = require('../controllers/entry');
const auth = require('../controllers/auth');
const passportService = require('../services/passport');
const passport = require('passport');
const fs = require('fs');

const userData = require('../controllers/userData');

// use JwtStrategy
const requireAuth = passport.authenticate('jwt', {session: false});
// use LocalStrategy
const requireSignin = passport.authenticate('local', {session: false});

const UserData = require('../models/userData');


module.exports = function router (app, io) {
  // console.log('io: ', io);
  // USER DATA
  // app.get('/api', userData.getAllData);
  app.get('/api', (req, res, next) => {
    // console.log('io in userData Controller: ', io);
    UserData.find({}, (err, entries) => {
      if (err) {
        return next(err);
      } else {
        // console.log('entries.length: ', entries.length);
        res.send(entries);
        io.sockets.on('connection', (socket) => {
          console.log('a user connected');
          socket.emit('db read', 'Hello Frontend from getAllData!');
        });
      }
    });
  });
  app.get('/api/id/:_id', userData.getDataById);
  app.post('/api/user-data', userData.addData);
  app.put('/api/id/:_id', requireAuth, userData.updateDataById);
  app.delete('/api/id/:_id', requireAuth, userData.deleteDataById);
  // AUTH
  app.post('/signin', requireSignin, auth.signin);
  app.post('/signup', auth.signup);
};
