const mongoose = require('mongoose');
// const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
  username: { type: String },
  email: { type: String},
  password: { type: String },
  spotifyId: { type: String },
  image: { type: String },
  refreshToken: { type: String },
  playlists: [{
    playlistId: { type: String },
    userId: { type: String }
  }]
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
