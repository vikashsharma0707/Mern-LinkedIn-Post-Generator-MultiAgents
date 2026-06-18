const { callOpenRouter } = require('../services/openrouter.service');
const History = require('../models/History');
const Analytics = require('../models/Analytics');
const { successResponse, errorResponse } = require('../utils/response');

const repurposeContent = async (req, res) => {
  try {
    const { content, contentType, outputFormats, model = 'gemini' } = req.body;

    if (!content || content.trim().length < 20) {
      return errorResponse(res, 'Content is required (min 20 chars)', 400);
    }

    const formats = outputFormats || ['linkedin', 'twitter', 'blog'];
    const results = {};

    const contentTypeLabel = contentType || 'content';

    for (const format of formats) {
      let prompt = '';

      if (format === 'linkedin') {
        prompt = `Convert the following ${contentTypeLabel} into a professional LinkedIn post.

Original Content:
${content}

Create a LinkedIn post that:
- Has a strong hook
- Is concise and scannable
- Includes a clear CTA
- Uses professional formatting
- Adds relevant emojis naturally
- Fits LinkedIn's best practices

Return only the LinkedIn post.`;
      } else if (format === 'twitter') {
        prompt = `Convert the following ${contentTypeLabel} into a Twitter/X thread.

Original Content:
${content}

Create a thread with:
- An engaging first tweet (hook)
- 5-8 tweets covering the key points
- Each tweet under 280 characters
- A strong closing tweet with CTA
- Numbered tweets (1/8, 2/8, etc.)

Return only the Twitter thread.`;
      } else if (format === 'blog') {
        prompt = `Convert the following ${contentTypeLabel} into a blog draft.

Original Content:
${content}

Create a blog draft with:
- An engaging title
- Introduction with hook
- Well-structured body with headers
- Actionable insights
- Conclusion with CTA
- 800-1500 words

Return only the blog draft.`;
      } else {
        prompt = `Convert the following ${contentTypeLabel} into a ${format} format.

Original Content:
${content}

Make it engaging, well-formatted, and optimized for ${format}.`;
      }

      const result = await callOpenRouter(prompt, model, {
        temperature: 0.7,
        maxTokens: 4000,
        systemPrompt: 'You are a content repurposing expert who transforms content across different platforms while maintaining the core message and optimizing for each platform.'
      });

      results[format] = result;
    }

    await History.create({
      user: req.user._id,
      type: 'repurpose',
      title: `Repurpose: ${contentTypeLabel}`,
      input: { content, contentType, outputFormats },
      output: results
    });

    await updateAnalytics(req.user._id, 'repurpose');

    successResponse(res, {
      results,
      originalContent: content,
      formats: formats
    }, 'Content repurposed successfully');
  } catch (error) {
    console.error('Repurpose error:', error);
    errorResponse(res, error.message || 'Failed to repurpose content');
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

module.exports = { repurposeContent };
