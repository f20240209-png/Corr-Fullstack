const express = require('express');
const router  = express.Router();
const {
  searchUsers,
  sendRequest,
  acceptRequest,
  rejectRequest,
  cancelRequest,
  getFriends,
  getPendingRequests,
  getFriendProfile,
  removeFriend,
} = require('../controllers/friendController');
const { protect } = require('../middleware/authMiddleware');
const { socialWriteLimiter, searchLimiter } = require('../middleware/rateLimits');

router.get('/users/search',               protect, searchLimiter, searchUsers);
router.get('/friends/:userId/profile',    protect, getFriendProfile);
router.get('/friends',                    protect, getFriends);
router.get('/friends/requests',           protect, getPendingRequests);
router.post('/friends/request/:userId',   protect, socialWriteLimiter, sendRequest);
router.post('/friends/accept/:requestId', protect, socialWriteLimiter, acceptRequest);
router.post('/friends/reject/:requestId', protect, socialWriteLimiter, rejectRequest);
router.delete('/friends/request/:requestId', protect, socialWriteLimiter, cancelRequest);
router.delete('/friends/:userId',         protect, socialWriteLimiter, removeFriend);

module.exports = router;
