const router = require('express').Router(); 
const { addComment, removeComment, addReply, removeReply } = require('../../controllers/comment-controller');

// set up route /api/comments/:pizzaId and use the addComment() method as a POST callback 
router.route('/:pizzaId').post(addComment);

// set up delete route for comments using the removeComment() method as a DELETE callback
router.route('/:pizzaId/:commentId').delete(removeComment);


router.route('/:pizzaId/commentId')
.put(addReply)
.delete(removeComment)

router.route('/:pizzaId/:commentId/:replyId').delete(removeReply);

module.exports = router; 