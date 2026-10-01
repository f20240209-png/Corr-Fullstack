const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config();
if (!process.env.JWT_SECRET) throw new Error('Set a stable JWT_SECRET before starting Corr.');

const authRoutes = require('./routes/authRoutes');
const profileRoutes = require('./routes/profileRoutes');
const recommendationRoutes = require('./routes/recommendationRoutes');
const skincareLogRoutes = require('./routes/skincareLogRoutes');
const ingredientRoutes = require('./routes/ingredientRoutes');
const communityRoutes = require('./routes/communityRoutes');
const friendRoutes = require('./routes/friendRoutes');

const app = express();

app.use(cors({
  origin: function (origin, callback) {
    // Allow requests with no origin (mobile apps, curl, Postman)
    if (!origin) return callback(null, true);

    const allowedOrigins = [
      'http://localhost:57132',
      'http://localhost:3000',
      'http://localhost',
      'https://inquisitive-clafoutis-600746.netlify.app',
    ];

    if (allowedOrigins.includes(origin)) {
      return callback(null, true);
    }

    // Additional explicitly configured frontend origins
    if ((process.env.CORS_ORIGINS || '').split(',').map(s => s.trim()).includes(origin)) {
      return callback(null, true);
    }

    // Allow any localhost port (covers flutter dev on any port)
    if (/^http:\/\/(localhost|127\.0\.0\.1)(:\d+)?$/.test(origin)) {
      return callback(null, true);
    }

    callback(new Error('Not allowed by CORS: ' + origin));
  },
  credentials: true,
}));
// Add these headers for Google Sign In popup to work
app.use((req, res, next) => {
  res.setHeader('Cross-Origin-Opener-Policy', 'same-origin-allow-popups');
  res.setHeader('Cross-Origin-Embedder-Policy', 'unsafe-none');
  next();
});

app.use(express.json({ limit: '10mb' }));
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

app.get('/', (req, res) => {
  res.json({ message: 'Skincare App API is running!' });
});

app.use('/api/auth', authRoutes);
app.use('/api/profile', profileRoutes);
app.use('/api/recommendations', recommendationRoutes);
app.use('/api/logs', skincareLogRoutes);
app.use('/api', ingredientRoutes);
app.use('/api/community', communityRoutes);
app.use('/api', friendRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log('Server running on http://localhost:' + PORT);
});