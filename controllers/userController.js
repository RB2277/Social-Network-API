const User = require('../models/User')

module.exports = {

//Get all users
async getUsers(req, res) {
    try {
        const users = await User.find();
        res.json(users)
    } catch (err) {
        res.status(500).json(err)
    }
},

async getSingleUser(req, res) {
    try {
        const user = await User.findOne({_id: req.params._id})
        .populate('thoghts', 'friends')

        if(!user) {
            return res.status(404).json({message: 'No user with that ID exists'})
        }
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
        const updatedUser = await User.findByIdAndUpdate(req.params.id, update, {new: true})
        res.json(updatedUser)
    } catch (err) {
        res.status(500).json(err)
    }
},




}


/*
API Routes
/api/users

GET all users

GET a single user by its _id and populated thought and friend data

POST a new user:

// example data
{
  "username": "lernantino",
  "email": "lernantino@gmail.com"
}
PUT to update a user by its _id

DELETE to remove user by its _id

BONUS: Remove a user's associated thoughts when deleted.
*/