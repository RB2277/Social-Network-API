const router = require('express').Router()

const {
    getUsers,
    getSingleUser,
    createUser,
    editUser,
    deleteUser
} = require ('../../controllers/userController')

router.route('/').get(getUsers).post(createUser)

router.route('/:id').get(getSingleUser).put(editUser).delete(deleteUser)


module.exports = router