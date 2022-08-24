const router = require('express').Router(); 
const { addComment, removeComment } = require('../../controllers/comment-controller');

// set up route /api/comments/:pizzaId and use the addComment() method as a POST callback 
router.route('/:pizzaId').post(addComment);

// set up delete route for comments using the removeComment() method as a DELETE callback
router.route('/:pizzaId/:commentId').delete(removeComment);





module.exports = router; 