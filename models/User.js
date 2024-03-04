const mongoose = require('mongoose');

//Validates email format
var emailValidation = function(email) {
  var regex = /^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/
  return regex.test(email)
}

const userSchema = new mongoose.Schema({
  username: { type: String, unique: true, required: true,  trim: true},
  email: { type: String, required: true, unique: true, validate: [emailValidation, "Please use a valid email address"]},
  thoughts: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Thought'}],
  friends: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User'}]
});

userSchema.virtual('friendCount')
.get(function () {
  return this.friends.length
})

const User = mongoose.model('user', userSchema);

module.exports = User

//Credit to ramon22 on stackoverflow for the emailValidation function. Link: https://stackoverflow.com/questions/18022365/mongoose-validate-email-syntax