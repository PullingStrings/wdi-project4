const mongoose = require('mongoose');
// const bcrypt = require('bcrypt');
const s3 = require('../lib/s3');


const playlistSchema = new mongoose.Schema({
  playlistId: { type: String },
  userId: { type: String }
});

const userSchema = new mongoose.Schema({
  username: { type: String },
  email: { type: String },
  password: { type: String },
  spotifyId: { type: String },
  image: { type: String },
  refreshToken: { type: String },
  location: {
    lat: { type: Number },
    lng: { type: Number }
  },
  playlists: [ playlistSchema ]
});

userSchema
  .path('image')
  .set(function getPreviousImage(image) {
    this._image = this.image;
    return image;
  });

userSchema
  .virtual('imageSRC')
  .get(function getImageSRC() {
    if(!this.image) return null;
    if(this.image.match(/^http/)) return this.image;
    return `https://s3-eu-west-1.amazonaws.com/${process.env.AWS_BUCKET_NAME}/${this.image}`;
  });

userSchema.pre('save', function checkPreviousImage(next) {
  if(this.isModified('image') && this._image && !this._image.match(/^http/)) {
    return s3.deleteObject({ Key: this._image }, next);
  }
  next();
});

userSchema.pre('remove', function removeImage(next) {
  if(this.image && !this.image.match(/^http/)) {
    return s3.deleteObject({ Key: this.image }, next);
  }
  next();
});


// userSchema
//   .virtual('passwordConfirmation')
//   .set(function setPasswordConfirmation(passwordConfirmation) {
//     this._passwordConfirmation = passwordConfirmation;
//   });
//
// userSchema.pre('validate', function checkPassword(next) {
//   if(!this.password && !this.spotifyId) {
//     this.invalidate('password', 'Password is required');
//   }
//
//
//   if(!this.password && this._passwordConfirmation !== this.password) {
//     this.invalidate('passwordConfirmation', 'Passwords do not match');
//   }
//   next();
// });
//
// userSchema.pre('save', function hashPassword(next) {
//   if(this.isModified('password')) {
//     this.password = bcrypt.hashSync(this.password, bcrypt.genSaltSync(8));
//   }
//   next();
// });
//
// userSchema.methods.validatePassword = function validatePassword(password) {
//   return bcrypt.compareSync(password, this.password);
// };

module.exports = mongoose.model('User', userSchema, );
