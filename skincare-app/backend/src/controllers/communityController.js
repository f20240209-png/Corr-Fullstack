const { serverError } = require('../services/errors');
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
    return serverError(req, res, error);
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
    return serverError(req, res, error);
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
    return serverError(req, res, error);
  }
};

// ─── CREATE a post ─────────────────────────────────────────────────────────
const createPost = async (req, res) => {
  try {
    const { question, details, category, skinType, isAnonymous } = req.body;

    if (typeof question !== 'string' || question.trim().length < 10 || question.length > 500) {
      return res.status(400).json({
        message: 'Question must be 10–500 characters.',
      });
    }

    if (typeof category !== 'string' || !category.trim() || category.length > 50 ||
        (details != null && (typeof details !== 'string' || details.length > 5000)) ||
        (skinType != null && (typeof skinType !== 'string' || skinType.length > 30)) ||
        (isAnonymous != null && typeof isAnonymous !== 'boolean')) {
      return res.status(400).json({ message: 'Provide a valid category and details of at most 5,000 characters.' });
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
    return serverError(req, res, error);
  }
};

// ─── ANSWER a post ─────────────────────────────────────────────────────────
const answerPost = async (req, res) => {
  try {
    const { answer, isAnonymous } = req.body;
    const postId = parseInt(req.params.id);

    if (typeof answer !== 'string' || answer.trim().length < 5 || answer.length > 5000 ||
        (isAnonymous != null && typeof isAnonymous !== 'boolean')) {
      return res.status(400).json({
        message: 'Answer must be 5–5,000 characters with a valid anonymity choice.',
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
    return serverError(req, res, error);
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
    return serverError(req, res, error);
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
    return serverError(req, res, error);
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
