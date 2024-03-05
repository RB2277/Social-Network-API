const router = require('express').Router()

const {
    getUsers,
    getSingleUser,
    createUser,
    editUser,
    deleteUser,
    addFriend,
    removeFriend,
} = require ('../../controllers/userController')

router.route('/').get(getUsers).post(createUser)

router.route('/:id').get(getSingleUser).put(editUser).delete(deleteUser)

router.route('/:userId/friends/:friendId').post(addFriend).delete(removeFriend)


module.exports = router