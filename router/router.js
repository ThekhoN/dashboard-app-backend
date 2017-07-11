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
        // io.sockets.on('connection', (socket) => {
        //   console.log('a user connected');
        //   socket.emit('db read', 'Hello Frontend from getAllData!');
        // });
      }
    });
  });
  app.get('/api/id/:_id', userData.getDataById);
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
      io.sockets.on('connection', (socket) => {
        console.log('a user connected');
        socket.emit('db post', 'New Data was added!');
      });
      return res.send(newUserData);
    });
  });
  app.put('/api/id/:_id', requireAuth, userData.updateDataById);
  app.delete('/api/id/:_id', requireAuth, userData.deleteDataById);
  // AUTH
  app.post('/signin', requireSignin, auth.signin);
  app.post('/signup', auth.signup);
};
