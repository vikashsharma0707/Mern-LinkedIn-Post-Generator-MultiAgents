const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');

const authRoutes = require('./routes/auth.routes');
const postRoutes = require('./routes/post.routes');
const hookRoutes = require('./routes/hook.routes');
const hashtagRoutes = require('./routes/hashtag.routes');
const improveRoutes = require('./routes/improve.routes');
const viralRoutes = require('./routes/viral.routes');
const carouselRoutes = require('./routes/carousel.routes');
const repurposeRoutes = require('./routes/repurpose.routes');
const analyticsRoutes = require('./routes/analytics.routes');
const historyRoutes = require('./routes/history.routes');

dotenv.config();

const app = express();

connectDB();

app.use(cors({
  origin: ['http://localhost:5173', 'http://localhost:3000'],
  credentials: true
}));

app.use(express.json({ limit: '10mb' }));

app.use('/api/auth', authRoutes);
app.use('/api/posts', postRoutes);
app.use('/api/hooks', hookRoutes);
app.use('/api/hashtags', hashtagRoutes);
app.use('/api/improve', improveRoutes);
app.use('/api/viral', viralRoutes);
app.use('/api/carousel', carouselRoutes);
app.use('/api/repurpose', repurposeRoutes);
app.use('/api/analytics', analyticsRoutes);
app.use('/api/history', historyRoutes);

app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'Server is running' });
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    message: err.message || 'Internal Server Error'
  });
});

module.exports = app;
