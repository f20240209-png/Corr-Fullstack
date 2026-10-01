const prisma = require('../services/prisma');

// ─── GET all posts (paginated) ─────────────────────────────────────────────
const getPosts = async (req, res) => {
  try {
    const page     = parseInt(req.query.page) || 1;
    const limit    = 10;
    const skip     = (page - 1) * limit;
    const category = req.query.category || null;

    const where = category ? { category } : {};

    const [posts, total] = await Promise.all([
      prisma.communityPost.findMany({
        where,
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
        include: {
          user:    { select: { name: true } },
          answers: { select: { id: true } },
        },
      }),
      prisma.communityPost.count({ where }),
    ]);

    const formatted = posts.map(p => ({
      id:          p.id,
      question:    p.question,
      details:     p.details,
      category:    p.category,
      skinType:    p.skinType,
      likes:       p.likes,
      createdAt:   p.createdAt,
      answerCount: p.answers.length,
      author:      p.isAnonymous ? 'Anonymous' : p.user.name,
    }));

    res.json({ posts: formatted, total, page, totalPages: Math.ceil(total / limit) });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// ─── GET single post with all answers ─────────────────────────────────────
const getPostById = async (req, res) => {
  try {
    const post = await prisma.communityPost.findUnique({
      where:   { id: parseInt(req.params.id) },
      include: {
        user:    { select: { name: true } },
        answers: {
          orderBy: { createdAt: 'asc' },
          include: { user: { select: { name: true } } },
        },
      },
    });

    if (!post) return res.status(404).json({ message: 'Post not found' });

    res.json({
      id:        post.id,
      question:  post.question,
      details:   post.details,
      category:  post.category,
      skinType:  post.skinType,
      likes:     post.likes,
      createdAt: post.createdAt,
      author:    post.isAnonymous ? 'Anonymous' : post.user.name,
      answers:   post.answers.map(a => ({
        id:        a.id,
        answer:    a.answer,
        isHelpful: a.isHelpful,
        createdAt: a.createdAt,
        author:    a.isAnonymous ? 'Anonymous' : a.user.name,
      })),
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// ─── GET current user's own posts ─────────────────────────────────────────
// FIX: added user include and all required fields for CommunityPost.fromJson
const getMyPosts = async (req, res) => {
  try {
    const posts = await prisma.communityPost.findMany({
      where:   { userId: req.userId },
      orderBy: { createdAt: 'desc' },
      include: {
        answers: { select: { id: true } },
        user:    { select: { name: true } }, // ← needed for author field
      },
    });

    res.json({
      posts: posts.map(p => ({
        id:          p.id,
        question:    p.question,
        details:     p.details,                                    // ← added
        category:    p.category,
        skinType:    p.skinType,                                   // ← added
        likes:       p.likes,
        createdAt:   p.createdAt,
        answerCount: p.answers.length,
        author:      p.isAnonymous ? 'Anonymous' : p.user.name,   // ← added
      })),
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// ─── CREATE a post ─────────────────────────────────────────────────────────
const createPost = async (req, res) => {
  try {
    const { question, details, category, skinType, isAnonymous } = req.body;

    if (!question || question.trim().length < 10) {
      return res.status(400).json({
        message: 'Question must be at least 10 characters.',
      });
    }

    if (!category) {
      return res.status(400).json({ message: 'Category is required.' });
    }

    const post = await prisma.communityPost.create({
      data: {
        userId:      req.userId,
        question:    question.trim(),
        details:     details?.trim() || null,
        category,
        skinType:    skinType || null,
        isAnonymous: isAnonymous ?? true,
      },
    });

    res.status(201).json({ message: 'Question posted!', post });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// ─── ANSWER a post ─────────────────────────────────────────────────────────
const answerPost = async (req, res) => {
  try {
    const { answer, isAnonymous } = req.body;
    const postId = parseInt(req.params.id);

    if (!answer || answer.trim().length < 5) {
      return res.status(400).json({
        message: 'Answer must be at least 5 characters.',
      });
    }

    const post = await prisma.communityPost.findUnique({ where: { id: postId } });
    if (!post) return res.status(404).json({ message: 'Post not found.' });

    // Prevent answering your own question
    if (post.userId === req.userId) {
      return res.status(400).json({ message: 'You cannot answer your own question.' });
    }

    const newAnswer = await prisma.communityAnswer.create({
      data: {
        postId,
        userId:      req.userId,
        answer:      answer.trim(),
        isAnonymous: isAnonymous ?? true,
      },
    });

    res.status(201).json({ message: 'Answer posted!', answer: newAnswer });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// ─── LIKE a post ───────────────────────────────────────────────────────────
const likePost = async (req, res) => {
  try {
    const post = await prisma.communityPost.update({
      where: { id: parseInt(req.params.id) },
      data:  { likes: { increment: 1 } },
    });
    res.json({ likes: post.likes });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// ─── MARK answer as helpful ────────────────────────────────────────────────
const markHelpful = async (req, res) => {
  try {
    const answer = await prisma.communityAnswer.update({
      where: { id: parseInt(req.params.id) },
      data:  { isHelpful: { increment: 1 } },
    });
    res.json({ isHelpful: answer.isHelpful });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

module.exports = {
  getPosts,
  getPostById,
  getMyPosts,
  createPost,
  answerPost,
  likePost,
  markHelpful,
};