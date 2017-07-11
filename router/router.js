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

module.exports = function router (app) {
  // USER DATA
  app.get('/api', userData.getAllData);
  app.get('/api/id/:_id', userData.getDataById);
  app.post('/api/user-data', userData.addData);
  app.put('/api/id/:_id', requireAuth, userData.updateDataById);
  app.delete('/api/id/:_id', requireAuth, userData.deleteDataById);
  // AUTH
  app.post('/signin', requireSignin, auth.signin);
  app.post('/signup', auth.signup);
};
