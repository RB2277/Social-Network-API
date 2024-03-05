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
        res.json(thought)
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
},

async createReaction(req, res) {
    try {
    const thought = await Thought.findById(req.params.id)
    if(!thought){
        return res.status(404).json({message: 'No thought with that ID exists'})
    }

    const {
        reactionBody,
        username
    } = req.body

    const newReaction = {
        reactionBody,
        username,
    }
    thought.reactions.push(newReaction)
    await thought.save()
    res.json({message: "Your reaction has been created", thought})
    } catch(err) {
        res.status(500).json(err)
    }
}, 

async deleteReaction(req, res) {
    try{
    const { thoughtId, reactionId } = req.params
    console.log(thoughtId)
    console.log(reactionId)

    const thought = await Thought.findById(thoughtId)
    if(!thought){
        return res.status(404).json({message: 'No thought with that ID exists'})
    }
    thought.reactions = thought.reactions.filter(reaction => !reaction.reactionID.equals(reactionId))
   await thought.save()
   res.json({message: "Your reaction has been removed", thought})
    } catch(err) {
        res.status(500).json(err)
    }
}

}
