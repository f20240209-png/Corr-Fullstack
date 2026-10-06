const express = require('express');
const router  = express.Router();
const { getPosts, getPostById, getMyPosts, createPost, answerPost, likePost, markHelpful } = require('../controllers/communityController');
const { protect } = require('../middleware/authMiddleware');
const { socialWriteLimiter } = require('../middleware/rateLimits');

router.get('/',                     protect, getPosts);
router.get('/my-posts',             protect, getMyPosts);
router.get('/:id',                  protect, getPostById);
router.post('/',                    protect, socialWriteLimiter, createPost);
router.post('/:id/answer',          protect, socialWriteLimiter, answerPost);
router.post('/:id/like',            protect, socialWriteLimiter, likePost);
router.post('/answers/:id/helpful', protect, socialWriteLimiter, markHelpful);

module.exports = router;
