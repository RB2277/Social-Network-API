const mongoose = require('mongoose');

const thoughtSchema = new mongoose.Schema({
  thoughtText: { type: String, required: true, minLength: 1, maxLength: 280},
  createdAt: { type: String, required: true, unique: true},
  //TODO: Use a getter method to format the timestamp on query
  lastAccessed: { type: Date, default: Date.now },
  //TODO: Figure out how to link this
  username: {type: String, required: true},
  reactions: []
});

//TODO: Schema Settings

// Create a virtual called reactionCount that retrieves the length of the thought's reactions array field on query.



const User = mongoose.model('user', userSchema);

module.exports = User