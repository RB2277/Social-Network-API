const mongoose = require('mongoose');

var emailValidation = function(email) {
  var regex = /^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/
  return regex.test(email)
}

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true, trim: true},
  email: { type: String, required: true, unique: true, validate: [emailValidation, "Please use a valid email address"]},
  thoughts: [

  ],
  friends: [

  ]
});

//TODO: Schema Settings

// Create a virtual called friendCount that retrieves the length of the user's friends array field on query


const User = mongoose.model('user', userSchema);

module.exports = User

//Credit to ramon22 on stackoverflow for the emailValidation function. Link: https://stackoverflow.com/questions/18022365/mongoose-validate-email-syntax