const passport = require('passport');
const User = require('../models/user');
const config = require('../config');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const LocalStrategy = require('passport-local');

/********************************************/
// handle signIn using LocalStrategy
/********************************************/
const localOptions = {
  usernameField: 'email'
};
const localLogin = new LocalStrategy(localOptions, (email, password, done) => {
  User.findOne({email}, (err, user) => {
    if (err) {
      return done(err, false);
    }
    if (!user) {
      return done(null, false);
    }
    // if user found, compare bcrypted password with db password
    user.comparePassword(password, (err, isMatch) => {
      if (err) {
        console.log('error in comparePassword');
        return done(err, false);
      }
      if (!isMatch) {
        return done(null, false);
      } else {
        // if  user email found in and password auth'd
        // then return user ~ to be used in auth.signin controller
        return done(null, user);
      }
    });
  });
});
/********************************************/
// handle signIn using JwtStrategy
/********************************************/
const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromHeader('authorization'),
  secretOrKey: config.secret
};
const jwtLogin = new JwtStrategy(jwtOptions, (payload, done) => {
  // payload is the returned value form tokenForUser
  // payload.sub ~ user.id
  User.findById(payload.sub, (err, user) => {
    if (err) {
      return done(err, false);
    }
    if (user) {
      // if exists, return user ~ auth'd
      return done(null, user);
    } else {
      return done(null, false);
    }
  });
});

// tell passport to use defined Strategies
passport.use(localLogin);
passport.use(jwtLogin);
