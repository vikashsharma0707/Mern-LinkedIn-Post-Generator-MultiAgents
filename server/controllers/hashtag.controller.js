const { callOpenRouter } = require('../services/openrouter.service');
const History = require('../models/History');
const Analytics = require('../models/Analytics');
const { successResponse, errorResponse } = require('../utils/response');

const generateHashtags = async (req, res) => {
  try {
    const { topic, industry, count = 15, model = 'gemini' } = req.body;

    if (!topic) {
      return errorResponse(res, 'Topic is required', 400);
    }

    const prompt = `Generate exactly ${count} highly relevant, professional LinkedIn hashtags for the following topic:

Topic: ${topic}
Industry: ${industry || 'General'}

Provide a mix of:
- 3-4 broad industry hashtags (high reach, 1M+ followers)
- 5-6 niche-specific hashtags (targeted, 50K-500K followers)
- 3-4 community/trending hashtags
- 2-3 branded or unique hashtags

Return ONLY the hashtags, one per line, with no numbers, no explanations, and no extra text. Each hashtag should be clean without the # symbol in the output (the system will add them).`;

    const hashtags = await callOpenRouter(prompt, model, {
      temperature: 0.5,
      maxTokens: 1000,
      systemPrompt: 'You are a hashtag strategist who specializes in LinkedIn hashtag optimization. You create professional hashtag combinations that maximize reach and engagement.'
    });

    const hashtagList = hashtags
      .split(/\n/)
      .map(tag => tag.trim().replace(/^#/, '').replace(/^\d+\.\s*/, ''))
      .filter(tag => tag.length > 0 && tag.length < 50)
      .slice(0, count);

    await History.create({
      user: req.user._id,
      type: 'hashtag',
      title: topic,
      input: { topic, industry, count },
      output: { hashtags: hashtagList }
    });

    await updateAnalytics(req.user._id, 'hashtag');

    successResponse(res, {
      hashtags: hashtagList,
      hashtagString: hashtagList.map(tag => `#${tag}`).join(' ')
    }, 'Hashtags generated successfully');
  } catch (error) {
    console.error('Hashtag generation error:', error);
    errorResponse(res, error.message || 'Failed to generate hashtags');
  }
};

const updateAnalytics = async (userId, type) => {
  let analytics = await Analytics.findOne({ user: userId });
  if (!analytics) {
    analytics = await Analytics.create({ user: userId });
  }
  const fieldMap = { post: 'totalPosts', hook: 'totalHooks', hashtag: 'totalHashtags', improve: 'totalImproves', carousel: 'totalCarousels', repurpose: 'totalRepurpose' };
  const field = fieldMap[type];
  if (field) {
    analytics[field] = (analytics[field] || 0) + 1;
  }
  analytics.lastUpdated = new Date();
  await analytics.save();
};

module.exports = { generateHashtags };
