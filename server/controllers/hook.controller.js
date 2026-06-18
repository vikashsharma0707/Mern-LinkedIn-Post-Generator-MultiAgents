const { callOpenRouter } = require('../services/openrouter.service');
const History = require('../models/History');
const Analytics = require('../models/Analytics');
const { successResponse, errorResponse } = require('../utils/response');

const generateHook = async (req, res) => {
  try {
    const { topic, industry, count = 5, model = 'gemini' } = req.body;

    if (!topic) {
      return errorResponse(res, 'Topic is required', 400);
    }

    const prompt = `Generate ${count} attention-grabbing LinkedIn hooks for the following topic:

Topic: ${topic}
Industry: ${industry || 'General'}

Each hook should:
- Be under 150 characters
- Create curiosity and stop the scroll
- Be specific and avoid generic advice
- Feel authentic and contrarian when appropriate
- Use strong opening words

Examples of great hooks:
- "Most developers are learning AI the wrong way."
- "The biggest mistake companies make with AI is not the technology."
- "Nobody talks about this hidden productivity hack."
- "I spent 10 years in [industry]. Here's what nobody tells you."
- "This one mistake is costing your company $50K per year."

Return only the hooks, numbered 1-${count}, with no extra explanations.`;

    const hooks = await callOpenRouter(prompt, model, {
      temperature: 0.8,
      maxTokens: 1500,
      systemPrompt: 'You are a hook writer who specializes in creating attention-grabbing LinkedIn opening lines. Your hooks are scroll-stopping, curiosity-driven, and highly effective.'
    });

    const hookList = hooks
      .split(/\n/)
      .map(h => h.replace(/^\d+\.\s*/, '').trim())
      .filter(h => h.length > 0 && h.length < 200);

    await History.create({
      user: req.user._id,
      type: 'hook',
      title: topic,
      input: { topic, industry, count },
      output: { hooks: hookList }
    });

    await updateAnalytics(req.user._id, 'hook');

    successResponse(res, { hooks: hookList }, 'Hooks generated successfully');
  } catch (error) {
    console.error('Hook generation error:', error);
    errorResponse(res, error.message || 'Failed to generate hooks');
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

module.exports = { generateHook };
