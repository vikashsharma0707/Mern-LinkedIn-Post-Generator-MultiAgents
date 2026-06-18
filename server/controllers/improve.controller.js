const { callOpenRouter } = require('../services/openrouter.service');
const History = require('../models/History');
const Analytics = require('../models/Analytics');
const { successResponse, errorResponse } = require('../utils/response');

const improvePost = async (req, res) => {
  try {
    const { content, model = 'gemini' } = req.body;

    if (!content || content.trim().length < 10) {
      return errorResponse(res, 'Post content is required (min 10 chars)', 400);
    }

    const prompt = `Improve the following LinkedIn post to make it more engaging, professional, and high-performing.

Original Post:
${content}

Provide:

1. IMPROVED POST:
Rewrite the post with:
- A stronger, scroll-stopping hook
- Better structure and readability
- A more compelling CTA
- Natural emoji usage where appropriate (🚀 🔥 💡 ✅ 📈 🤖 ⚡ 🎯)
- Improved formatting with line breaks
- More specific and actionable content

2. BETTER HOOK:
Suggest 3 alternative hooks that are stronger than the original.

3. BETTER CTA:
Suggest 3 improved call-to-action lines.

4. FORMATTING TIPS:
Provide 3-5 specific formatting improvements.

5. ENGAGEMENT BOOSTERS:
List 3 ways to increase comments and shares.

Return a structured response with clear sections.`;

    const result = await callOpenRouter(prompt, model, {
      temperature: 0.7,
      maxTokens: 4000,
      systemPrompt: 'You are a LinkedIn content optimization expert. You improve posts by making them more engaging, readable, and conversion-focused. You provide specific, actionable improvements.'
    });

    const improvedPost = extractSection(result, 'IMPROVED POST') || result;
    const betterHooks = extractSection(result, 'BETTER HOOK') || '';
    const betterCta = extractSection(result, 'BETTER CTA') || '';
    const formattingTips = extractSection(result, 'FORMATTING TIPS') || '';
    const engagementBoosters = extractSection(result, 'ENGAGEMENT BOOSTERS') || '';

    await History.create({
      user: req.user._id,
      type: 'improve',
      title: 'Post Improvement',
      input: { content },
      output: {
        improvedPost,
        betterHooks,
        betterCta,
        formattingTips,
        engagementBoosters
      }
    });

    await updateAnalytics(req.user._id, 'improve');

    successResponse(res, {
      improvedPost,
      betterHooks,
      betterCta,
      formattingTips,
      engagementBoosters,
      originalContent: content
    }, 'Post improved successfully');
  } catch (error) {
    console.error('Improvement error:', error);
    errorResponse(res, error.message || 'Failed to improve post');
  }
};

const extractSection = (text, sectionName) => {
  const regex = new RegExp(`${sectionName}[:\s]*\n*([\s\S]*?)(?=\n\n\d*\.\s+[A-Z]|\n[A-Z][A-Z\s]+[:\s]*\n|$)`, 'i');
  const match = text.match(regex);
  return match ? match[1].trim() : null;
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

module.exports = { improvePost };
