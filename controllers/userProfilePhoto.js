const fs = require('fs');
const UserProfilePhoto = require('../models/userProfilePhoto');

const userProfilePhoto = {
  uploadPhoto: (req, res, next) => {
    console.log('trying to upload photo. . .');
    res.send('testing uploadPhoto');
    // let newUserProfilePhoto = new UserProfilePhoto();
    // newUserProfilePhoto.img.data = fs.readFileSync(req.files.userPhoto.path);
    // newUserProfilePhoto.img.contentType = 'img/png';
    // newUserProfilePhoto.save();
  }
};

/*
const userProfilePhoto = {
  uploadPhoto: (req, res, next) => {
    console.log('trying to upload photo. . .');
    let newUserProfilePhoto = new UserProfilePhoto();
    newUserProfilePhoto.img.data = fs.readFileSync(req.files.userPhoto.path);
    newUserProfilePhoto.img.contentType = 'img/png';
    newUserProfilePhoto.save();
  }
};
*/

module.exports = userProfilePhoto;
