const UserData = require('../models/userData');

const userData = {
  getAllData: (req, res, next) => {
    UserData.find({}, (err, entries) => {
      if (err) {
        return next(err);
      } else {
        // console.log('entries.length: ', entries.length);
        res.send(entries);
      }
    });
  },
  getDataById: (req, res, next) => {
    const id = req.params._id;
    UserData.findOne({_id: id}, (err, entry) => {
      if (err) {
        return next(err);
      } else {
        res.send(entry);
      }
    });
  },
  addData: (req, res, next) => {
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
      return res.send(newUserData);
    });
  },
  deleteDataById: (req, res, next) => {
    const id = req.params._id;
    UserData.find({_id: id}).remove().exec((err, entry) => {
      if (err) {
        return next(err);
      } else {
        res.send('entry was removed. . .');
      }
    });
  },
  updateDataById: (req, res, next) => {
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
      return res.send(entry);
    });
  }
};

module.exports = userData;
