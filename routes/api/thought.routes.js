const router = require('express').Router()

const {
    getThoughts,
    getSingleThought,
    createThought,
    editThought,
    deleteThought,
    createReaction,
    deleteReaction
} = require ('../../controllers/thoughtController')

router.route('/').get(getThoughts).post(createThought)

router.route('/:id').get(getSingleThought).put(editThought).delete(deleteThought)

router.route('/:id/reactions').post(createReaction)

router.route('/:thoughtId/reactions/:reactionId').delete(deleteReaction)


module.exports = router