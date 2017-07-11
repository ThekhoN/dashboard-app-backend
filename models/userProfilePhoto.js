const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const userProfilePhotoSchema = new Schema({
  userProfilePhoto: {
    type: Buffer,
    required: true,
    contentType: String
  }
});

const UserProfilePhoto = mongoose.model('userProfilePhoto', userProfilePhotoSchema);
module.exports = UserProfilePhoto;
