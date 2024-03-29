const User = require('../models/User')

module.exports = {

//Get all users
async getUsers(req, res) {
    try {
        const users = await User.find()
        .populate('friends').populate('thoughts')  
        res.json(users)
    } catch (err) {
        res.status(500).json(err)
    }
},

async getSingleUser(req, res) {
    try {
        const user = await User.findById(req.params.id)
        .populate('friends').populate('thoughts')
        if(!user) {
            return res.status(404).json({message: 'No user with that ID exists'})
        }
        res.json({user})
    } catch (err) {
        res.status(500).json(err)
    }
},

async createUser(req, res) {
    try {
        const newUser = await User.create(req.body);
        res.json(newUser)
    } catch (err) {
        res.status(500).json(err)
    }
},

async editUser(req, res) {
    try {
        const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, {new: true})
        res.json(updatedUser)
    } catch (err) {
        res.status(500).json(err)
    }
},

async deleteUser(req, res) {
    try {
        const deletedUser = await User.findOneAndDelete({_id: req.params.id})
        if(!deletedUser){
            return res.status(404).json({message: 'No user with that ID exists'})
        }
        res.json({message: 'User has been deleted'})
    } catch (err) {
        res.status(500).json(err)
    }
},

async addFriend(req, res) {
    try {
        const { userId, friendId } = req.params
    const user = await User.findById(userId)
    if(!user){
        return res.status(404).json({message: 'No user with that ID exists'})
    }


    user.friends.push(friendId)
    await user.save()
    res.json({message: "Friend added!", user})
    } catch(err) {
        res.status(500).json(err)
    }
}, 

async removeFriend(req, res) {
    try{
        const { userId, friendId } = req.params


    const user = await User.findById(userId)
    console.log(user)
    if(!user){
        return res.status(404).json({message: 'No user with that ID exists'})
    }
    user.friends = user.friends.filter(friend => !friend._id.equals(friendId))
   await user.save()
   res.json({message: "Your friend has been removed", user})
    } catch(err) {
        res.status(500).json(err)
    }
}



}

