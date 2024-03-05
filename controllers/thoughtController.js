const Thought = require('../models/Thought')

module.exports = {
//Get all thoughts
async getThoughts(req, res) {
    try {
        const thoughts = await Thought.find();
        res.json(thoughts)
    } catch (err) {
        res.status(500).json(err)
    }
},

async getSingleThought(req, res) {
    try {
        const thought = await Thought.findById(req.params.id)

        if(!thought) {
            return res.status(404).json({message: 'No thought with that ID exists'})
        }
        res.json({thought})
    } catch (err) {
        res.status(500).json(err)
    }
},

async createThought(req, res) {
    try {
        const newThought = await Thought.create(req.body);
        res.json(newThought)
    } catch (err) {
        res.status(500).json(err)
    }
},

async editThought(req, res) {
    try {
        const updatedThought = await Thought.findByIdAndUpdate(req.params.id, req.body, {new: true})
        res.json(updatedThought)
    } catch (err) {
        res.status(500).json(err)
    }
},

async deleteThought(req, res) {
    try {
        const deletedThought = await Thought.findOneAndDelete({_id: req.params.id})
        if(!deletedThought){
            return res.status(404).json({message: 'No thought with that ID exists'})
        }
        res.json({message: 'Thought has been deleted'})
    } catch (err) {
        res.status(500).json(err)
    }
}














    
}

/*
/api/users/:userId/friends/:friendId

POST to add a new friend to a user's friend list

DELETE to remove a friend from a user's friend list

/api/thoughts

GET to get all thoughts

GET to get a single thought by its _id

POST to create a new thought (don't forget to push the created thought's _id to the associated user's thoughts array field)

// example data
{
  "thoughtText": "Here's a cool thought...",
  "username": "lernantino",
  "userId": "5edff358a0fcb779aa7b118b"
}
PUT to update a thought by its _id

DELETE to remove a thought by its _id

/api/thoughts/:thoughtId/reactions

POST to create a reaction stored in a single thought's reactions array field

DELETE to pull and remove a reaction by the reaction's reactionId value
*/