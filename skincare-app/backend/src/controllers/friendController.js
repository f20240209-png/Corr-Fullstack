const prisma = require('../services/prisma');

// GET /api/users/search?username=xxx
const searchUsers = async (req, res) => {
  try {
    const { username } = req.query;
    const myId = req.userId;

    if (!username || username.trim().length < 2) {
      return res.json({ users: [] });
    }

    const users = await prisma.user.findMany({
      where: { username: { contains: username.trim() }, id: { not: myId } },
      select: {
        id:      true,
        name:    true,
        username: true,
        profile: { select: { skinType: true } },
      },
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
          skinType:       u.profile?.skinType ?? null,
          relationStatus,
          requestId:      request?.id ?? null,
        };
      })
    );

    res.json({ users: results });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// POST /api/friends/request/:userId
const sendRequest = async (req, res) => {
  try {
    const senderId   = req.userId;
    const receiverId = parseInt(req.params.userId);

    if (senderId === receiverId) {
      return res.status(400).json({ message: 'You cannot add yourself.' });
    }

    const receiver = await prisma.user.findUnique({ where: { id: receiverId } });
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
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// POST /api/friends/accept/:requestId
const acceptRequest = async (req, res) => {
  try {
    const myId      = req.userId;
    const requestId = parseInt(req.params.requestId);

    const request = await prisma.friendRequest.findUnique({ where: { id: requestId } });
    if (!request) return res.status(404).json({ message: 'Request not found.' });
    if (request.receiverId !== myId) return res.status(403).json({ message: 'Not authorised.' });
    if (request.status !== 'PENDING') return res.status(400).json({ message: 'Request already handled.' });

    const updated = await prisma.friendRequest.update({
      where: { id: requestId },
      data:  { status: 'ACCEPTED' },
    });

    res.json({ message: 'Friend request accepted!', request: updated });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// POST /api/friends/reject/:requestId
const rejectRequest = async (req, res) => {
  try {
    const myId      = req.userId;
    const requestId = parseInt(req.params.requestId);

    const request = await prisma.friendRequest.findUnique({ where: { id: requestId } });
    if (!request) return res.status(404).json({ message: 'Request not found.' });
    if (request.receiverId !== myId) return res.status(403).json({ message: 'Not authorised.' });

    await prisma.friendRequest.update({
      where: { id: requestId },
      data:  { status: 'REJECTED' },
    });

    res.json({ message: 'Friend request rejected.' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// DELETE /api/friends/request/:requestId
const cancelRequest = async (req, res) => {
  try {
    const myId      = req.userId;
    const requestId = parseInt(req.params.requestId);

    const request = await prisma.friendRequest.findUnique({ where: { id: requestId } });
    if (!request) return res.status(404).json({ message: 'Request not found.' });
    if (request.senderId !== myId) return res.status(403).json({ message: 'Not authorised.' });

    await prisma.friendRequest.delete({ where: { id: requestId } });
    res.json({ message: 'Request cancelled.' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
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
        sender:   { select: { id: true, name: true, username: true, profile: { select: { skinType: true } } } },
        receiver: { select: { id: true, name: true, username: true, profile: { select: { skinType: true } } } },
      },
    });

    const friends = accepted.map((r) => {
      const friend = r.senderId === myId ? r.receiver : r.sender;
      return {
        id:        friend.id,
        name:      friend.name,
        username:  friend.username,
        skinType:  friend.profile?.skinType ?? null,
        requestId: r.id,
      };
    });

    res.json({ friends });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
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
        sender: { select: { id: true, name: true, username: true, profile: { select: { skinType: true } } } },
      },
    });

    res.json({
      requests: requests.map((r) => ({
        id:       r.id,
        senderId: r.senderId,
        name:     r.sender.name,
        username: r.sender.username,
        skinType: r.sender.profile?.skinType ?? null,
        sentAt:   r.createdAt,
      })),
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// GET /api/friends/:userId/profile
const getFriendProfile = async (req, res) => {
  try {
    const myId     = req.userId;
    const friendId = parseInt(req.params.userId);

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
      select: {
        id:       true,
        name:     true,
        username: true,
        profile:  { select: { skinType: true, skinGoals: true, budget: true } },
        skincareLogs: {
          orderBy: { createdAt: 'desc' },
          take: 10,
          select: { id: true, timeOfDay: true, productsUsed: true, notes: true, photo: true, createdAt: true },
        },
      },
    });

    if (!user) return res.status(404).json({ message: 'User not found.' });

    res.json({
      id:       user.id,
      name:     user.name,
      username: user.username,
      profile:  user.profile
          ? { ...user.profile, skinGoals: JSON.parse(user.profile.skinGoals) }
          : null,
      skincareLogs: user.skincareLogs.map((l) => ({
        ...l,
        productsUsed: JSON.parse(l.productsUsed),
      })),
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
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
};