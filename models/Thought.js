const mongoose = require('mongoose');

const reactionSchema = new mongoose.Schema({
  reactionID: { type: mongoose.Schema.Types.ObjectId, default: () => new mongoose.Types.ObjectId()},
  reactionBody: { type: String, required: true, maxLength: 280},
  username: {type: String, required: true},
  createdAt: { type: Date, default: Date.now },
});




const thoughtSchema = new mongoose.Schema({
  thoughtText: { type: String, required: true, minLength: 1, maxLength: 280},
  createdAt: { type: String, required: true, unique: true},
  //TODO: Use a getter method to format the timestamp on query
  lastAccessed: { type: Date, default: Date.now },
  username: {type: String, required: true},
  reactions: [{reactionSchema}]
});

//TODO: Schema Settings

// Create a virtual called reactionCount that retrieves the length of the thought's reactions array field on query.



const Thought = mongoose.model('thought', thoughtSchema);

module.exports = Thought