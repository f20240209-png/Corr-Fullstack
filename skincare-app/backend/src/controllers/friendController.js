const { serverError } = require('../services/errors');
const prisma = require('../services/prisma');
const publicIdentity = { id: true, name: true, username: true };
const positiveId = value => typeof value === 'string' && /^[1-9]\d{0,9}$/.test(value) && Number(value) <= 2147483647 ? Number(value) : null;

// GET /api/users/search?username=xxx
const searchUsers = async (req, res) => {
  try {
    const { username } = req.query;
    const myId = req.userId;

    if (username === undefined || (typeof username === 'string' && username.trim().length < 2)) {
      return res.json({ users: [] });
    }
    if (typeof username !== 'string' || username.trim().length > 30) {
      return res.status(400).json({ message: 'Search with a username of 2–30 characters.' });
    }

    const users = await prisma.user.findMany({
      where: { username: { contains: username.trim() }, id: { not: myId } },
      select: publicIdentity,
      take: 10,
    });

    const results = await Promise.all(
      users.map(async (u) => {
        const request = await prisma.friendRequest.findFirst({
          where: {
            OR: [
              { senderId: myId, receiverId: u.id },
              { senderId: u.id, receiverId: myId },
            ],
          },
        });

        let relationStatus = 'NONE';
        if (request) {
          if (request.status === 'ACCEPTED') {
            relationStatus = 'FRIENDS';
          } else if (request.status === 'PENDING') {
            relationStatus = request.senderId === myId ? 'PENDING_SENT' : 'PENDING_RECEIVED';
          }
        }

        return {
          id:             u.id,
          name:           u.name,
          username:       u.username,
          relationStatus,
          requestId:      request?.id ?? null,
        };
      })
    );

    res.json({ users: results });
  } catch (error) {
    return serverError(req, res, error);
  }
};

// POST /api/friends/request/:userId
const sendRequest = async (req, res) => {
  try {
    const senderId   = req.userId;
    const receiverId = positiveId(req.params.userId);
    if (!receiverId) return res.status(400).json({ message: 'Invalid user ID.' });

    if (senderId === receiverId) {
      return res.status(400).json({ message: 'You cannot add yourself.' });
    }

    const receiver = await prisma.user.findUnique({ where: { id: receiverId }, select: { id: true } });
    if (!receiver) return res.status(404).json({ message: 'User not found.' });

    const existing = await prisma.friendRequest.findFirst({
      where: {
        OR: [
          { senderId, receiverId },
          { senderId: receiverId, receiverId: senderId },
        ],
      },
    });

    if (existing) {
      if (existing.status === 'ACCEPTED') {
        return res.status(400).json({ message: 'You are already friends.' });
      }
      if (existing.status === 'PENDING') {
        return res.status(400).json({ message: 'Friend request already sent.' });
      }
      const updated = await prisma.friendRequest.update({
        where: { id: existing.id },
        data:  { status: 'PENDING', senderId, receiverId },
      });
      return res.json({ message: 'Friend request sent!', request: updated });
    }

    const request = await prisma.friendRequest.create({
      data: { senderId, receiverId, status: 'PENDING' },
    });

    res.status(201).json({ message: 'Friend request sent!', request });
  } catch (error) {
    return serverError(req, res, error);
  }
};

// POST /api/friends/accept/:requestId
const acceptRequest = async (req, res) => {
  try {
    const myId      = req.userId;
    const requestId = positiveId(req.params.requestId);
    if (!requestId) return res.status(400).json({ message: 'Invalid request ID.' });

    const request = await prisma.friendRequest.findFirst({ where: { id: requestId, receiverId: myId } });
    if (!request) return res.status(404).json({ message: 'Request not found.' });
    if (request.status !== 'PENDING') return res.status(400).json({ message: 'Request already handled.' });

    const updated = await prisma.friendRequest.updateMany({
      where: { id: requestId, receiverId: myId, status: 'PENDING' },
      data:  { status: 'ACCEPTED' },
    });
    if (!updated.count) return res.status(409).json({ message: 'This request changed. Refresh your friends before trying again.' });

    res.json({ message: 'Friend request accepted!', request: { id: requestId, status: 'ACCEPTED' } });
  } catch (error) {
    return serverError(req, res, error);
  }
};

// POST /api/friends/reject/:requestId
const rejectRequest = async (req, res) => {
  try {
    const myId      = req.userId;
    const requestId = positiveId(req.params.requestId);
    if (!requestId) return res.status(400).json({ message: 'Invalid request ID.' });

    const request = await prisma.friendRequest.findFirst({ where: { id: requestId, receiverId: myId } });
    if (!request) return res.status(404).json({ message: 'Request not found.' });

    if (request.status !== 'PENDING') return res.status(400).json({ message: 'Request already handled.' });

    const updated = await prisma.friendRequest.updateMany({
      where: { id: requestId, receiverId: myId, status: 'PENDING' },
      data:  { status: 'REJECTED' },
    });
    if (!updated.count) return res.status(409).json({ message: 'This request changed. Refresh your friends before trying again.' });

    res.json({ message: 'Friend request rejected.' });
  } catch (error) {
    return serverError(req, res, error);
  }
};

// DELETE /api/friends/request/:requestId
const cancelRequest = async (req, res) => {
  try {
    const myId      = req.userId;
    const requestId = positiveId(req.params.requestId);
    if (!requestId) return res.status(400).json({ message: 'Invalid request ID.' });

    const request = await prisma.friendRequest.findFirst({ where: { id: requestId, senderId: myId } });
    if (!request) return res.status(404).json({ message: 'Request not found.' });
    if (request.status !== 'PENDING') return res.status(400).json({ message: 'Only a pending request can be cancelled.' });

    const removed = await prisma.friendRequest.deleteMany({ where: { id: requestId, senderId: myId, status: 'PENDING' } });
    if (!removed.count) return res.status(409).json({ message: 'This request changed. Refresh your friends before trying again.' });
    res.json({ message: 'Request cancelled.' });
  } catch (error) {
    return serverError(req, res, error);
  }
};

// GET /api/friends
const getFriends = async (req, res) => {
  try {
    const myId = req.userId;

    const accepted = await prisma.friendRequest.findMany({
      where: {
        status: 'ACCEPTED',
        OR: [{ senderId: myId }, { receiverId: myId }],
      },
      include: {
        sender:   { select: publicIdentity },
        receiver: { select: publicIdentity },
      },
    });

    const friends = accepted.map((r) => {
      const friend = r.senderId === myId ? r.receiver : r.sender;
      return {
        id:        friend.id,
        name:      friend.name,
        username:  friend.username,
        requestId: r.id,
      };
    });

    res.json({ friends });
  } catch (error) {
    return serverError(req, res, error);
  }
};

// GET /api/friends/requests
const getPendingRequests = async (req, res) => {
  try {
    const myId = req.userId;

    const requests = await prisma.friendRequest.findMany({
      where:   { receiverId: myId, status: 'PENDING' },
      orderBy: { createdAt: 'desc' },
      include: {
        sender: { select: publicIdentity },
      },
    });

    res.json({
      requests: requests.map((r) => ({
        id:       r.id,
        senderId: r.senderId,
        name:     r.sender.name,
        username: r.sender.username,
        sentAt:   r.createdAt,
      })),
    });
  } catch (error) {
    return serverError(req, res, error);
  }
};

// GET /api/friends/:userId/profile
const getFriendProfile = async (req, res) => {
  try {
    const myId     = req.userId;
    const friendId = positiveId(req.params.userId);
    if (!friendId) return res.status(400).json({ message: 'Invalid user ID.' });

    const friendship = await prisma.friendRequest.findFirst({
      where: {
        status: 'ACCEPTED',
        OR: [
          { senderId: myId,     receiverId: friendId },
          { senderId: friendId, receiverId: myId },
        ],
      },
    });

    if (!friendship) {
      return res.status(403).json({ message: 'You are not friends with this user.' });
    }

    const user = await prisma.user.findUnique({
      where: { id: friendId },
      select: publicIdentity,
    });

    if (!user) return res.status(404).json({ message: 'User not found.' });

    res.json({
      id:       user.id,
      name:     user.name,
      username: user.username,
      // Empty legacy fields keep older clients readable, without fetching any
      // private profile, log, discovery or journal information from the DB.
      profile: null,
      skincareLogs: [],
      visibility: 'private',
    });
  } catch (error) {
    return serverError(req, res, error);
  }
};

// DELETE /api/friends/:userId — either participant may end a friendship.
const removeFriend = async (req, res) => {
  try {
    const friendId = positiveId(req.params.userId);
    if (!friendId || friendId === req.userId) return res.status(400).json({ message: 'Invalid friend ID.' });
    await prisma.friendRequest.deleteMany({ where: {
      status: 'ACCEPTED',
      OR: [
        { senderId: req.userId, receiverId: friendId },
        { senderId: friendId, receiverId: req.userId },
      ],
    } });
    return res.json({ message: 'Friend removed.' });
  } catch (error) {
    return serverError(req, res, error);
  }
};

module.exports = {
  searchUsers,
  sendRequest,
  acceptRequest,
  rejectRequest,
  cancelRequest,
  getFriends,
  getPendingRequests,
  getFriendProfile,
  removeFriend,
};
