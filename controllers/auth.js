const User = require('../models/user');
const jwt = require('jwt-simple');
const config = require('../config');

const tokenForUser = user => {
  const timeStamp = new Date().getTime();
  return jwt.encode({
    sub: user.id,
    iat: timeStamp
  }, config.secret);
};

const auth = {
  signin: function (req, res, next) {
    res.send({token: tokenForUser(req.user)});
  },
  signup: function (req, res, next) {
    const email = req.body.email;
    const password = req.body.password;
    if (!email || !password) {
      return res.status(422).send({
        error: 'email & password are required'
      });
    }
    User.findOne({email}, (err, existingUser) => {
      if (err) {
        return next(err);
      }
      if (existingUser) {
        return res.status(422).send({error: 'email already in use'});
      }
      const user = new User({
        email,
        password
      });
      user.save(err => {
        if (err) {
          return next(err);
        } else {
          res.json({
            token: tokenForUser(user)
          });
        }
      });
    });
  }
};

module.exports = auth;
