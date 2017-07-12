const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userDataSchema = new Schema({
  gender: {
    type: String,
    required: true
  },
  timeStamp: {
    type: Date,
    default: Date.now
  },
  locale: {
    type: String,
    required: true
  },
  profilePhoto: {
    type: String,
    required: true
  },
  // -12 to +12, denotes the time difference with GMT
  timezone: {
    type: String,
    required: true
  },
  lat: {
    type: String,
    required: true
  },
  long: {
    type: String,
    required: true
  }
});

const UserData = mongoose.model('userData', userDataSchema);
module.exports = UserData;
