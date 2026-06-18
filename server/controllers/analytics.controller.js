const Analytics = require('../models/Analytics');
const GeneratedPost = require('../models/GeneratedPost');
const { successResponse, errorResponse } = require('../utils/response');

const getAnalytics = async (req, res) => {
  try {
    let analytics = await Analytics.findOne({ user: req.user._id });
    if (!analytics) {
      analytics = await Analytics.create({ user: req.user._id });
    }

    const savedPosts = await GeneratedPost.countDocuments({ user: req.user._id, isSaved: true });
    const totalPosts = await GeneratedPost.countDocuments({ user: req.user._id });

    const recentActivity = await GeneratedPost.find({ user: req.user._id })
      .sort({ createdAt: -1 })
      .limit(5)
      .select('topic tone createdAt');

    const stats = {
      totalPosts,
      totalHooks: analytics.totalHooks || 0,
      totalHashtags: analytics.totalHashtags || 0,
      totalImproves: analytics.totalImproves || 0,
      totalCarousels: analytics.totalCarousels || 0,
      totalRepurpose: analytics.totalRepurpose || 0,
      totalSaved: savedPosts,
      totalGenerations: totalPosts + (analytics.totalHooks || 0) + (analytics.totalHashtags || 0) + (analytics.totalImproves || 0) + (analytics.totalCarousels || 0) + (analytics.totalRepurpose || 0),
      recentActivity: recentActivity.map(p => ({
        type: 'post',
        title: p.topic,
        tone: p.tone,
        date: p.createdAt
      })),
      lastUpdated: analytics.lastUpdated
    };

    successResponse(res, stats, 'Analytics retrieved');
  } catch (error) {
    errorResponse(res, error.message);
  }
};

module.exports = { getAnalytics };
