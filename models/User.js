const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true, trim: true},
  //I still need to setup the email address validation
  email: { type: String, required: true, unique: true},
  lastAccessed: { type: Date, default: Date.now },
  thoughts: [

  ],
  friends: [

  ]
});

//TODO: Schema Settings

// Create a virtual called friendCount that retrieves the length of the user's friends array field on query


const User = mongoose.model('user', userSchema);

module.exports = User