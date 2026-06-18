const mongoose = require('mongoose');

const analyticsSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  totalPosts: {
    type: Number,
    default: 0
  },
  totalHooks: {
    type: Number,
    default: 0
  },
  totalHashtags: {
    type: Number,
    default: 0
  },
  totalImproves: {
    type: Number,
    default: 0
  },
  totalCarousels: {
    type: Number,
    default: 0
  },
  totalRepurpose: {
    type: Number,
    default: 0
  },
  totalSaved: {
    type: Number,
    default: 0
  },
  averageViralScore: {
    type: Number,
    default: 0
  },
  monthlyStats: [{
    month: String,
    posts: Number,
    hooks: Number,
    carousels: Number,
    repurpose: Number
  }],
  lastUpdated: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Analytics', analyticsSchema);
