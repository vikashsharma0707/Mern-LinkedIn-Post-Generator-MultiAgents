const GeneratedPost = require('../models/GeneratedPost');
const History = require('../models/History');
const Analytics = require('../models/Analytics');
const { successResponse, errorResponse } = require('../utils/response');
const researchAgent = require('../agents/researchAgent');
const plannerAgent = require('../agents/plannerAgent');
const writerAgent = require('../agents/writerAgent');
const hashtagAgent = require('../agents/hashtagAgent');
const reviewerAgent = require('../agents/reviewerAgent');

const generatePost = async (req, res) => {
  try {
    const { topic, industry, audience, tone, length, additionalContext, model = 'gemini' } = req.body;

    if (!topic || !industry || !audience || !tone || !length) {
      return errorResponse(res, 'Missing required fields', 400);
    }

    const toneDescriptions = {
      professional: 'Formal, business-oriented, and polished',
      technical: 'Deep technical details, data-driven, and analytical',
      casual: 'Conversational, friendly, and approachable',
      storytelling: 'Narrative-driven, emotional, and personal',
      motivational: 'Uplifting, inspiring, and empowering',
      'founder style': 'Direct, opinionated, and bold leadership voice'
    };

    const lengthDescriptions = {
      short: '1-2 short paragraphs (under 300 characters)',
      medium: '3-4 paragraphs (300-800 characters)',
      long: 'Detailed post with multiple sections (800+ characters)'
    };

    const resolvedTone = toneDescriptions[tone] || tone;
    const resolvedLength = lengthDescriptions[length] || length;

    const researchData = await researchAgent(topic, industry, audience);
    const planData = await plannerAgent(researchData, resolvedTone, resolvedLength, additionalContext);
    const writerData = await writerAgent(planData, model);
    const hashtagData = await hashtagAgent(writerData, model);
    const reviewData = await reviewerAgent(hashtagData, model);

    const post = await GeneratedPost.create({
      user: req.user._id,
      topic,
      industry,
      audience,
      tone,
      length,
      additionalContext,
      content: reviewData.post,
      hashtags: reviewData.hashtags,
      cta: reviewData.review?.match(/(?:Better CTA|Suggested CTA):\s*([^\n]+)/i)?.[1] || '',
      modelUsed: model
    });

    await History.create({
      user: req.user._id,
      type: 'post',
      title: topic,
      input: { topic, industry, audience, tone, length, additionalContext },
      output: { content: reviewData.post, hashtags: reviewData.hashtags, scores: reviewData.scores }
    });

    await updateAnalytics(req.user._id, 'post');

    successResponse(res, {
      post: {
        id: post._id,
        content: reviewData.post,
        hashtags: reviewData.hashtags,
        hashtagString: reviewData.hashtagString,
        cta: post.cta,
        scores: reviewData.scores,
        research: reviewData.research,
        plan: reviewData.plan,
        review: reviewData.review
      }
    }, 'Post generated successfully');
  } catch (error) {
    console.error('Post generation error:', error);
    errorResponse(res, error.message || 'Failed to generate post');
  }
};

const getPosts = async (req, res) => {
  try {
    const posts = await GeneratedPost.find({ user: req.user._id }).sort({ createdAt: -1 });
    successResponse(res, posts, 'Posts retrieved');
  } catch (error) {
    errorResponse(res, error.message);
  }
};

const savePost = async (req, res) => {
  try {
    const post = await GeneratedPost.findById(req.params.id);
    if (!post || post.user.toString() !== req.user._id.toString()) {
      return errorResponse(res, 'Post not found', 404);
    }
    post.isSaved = !post.isSaved;
    await post.save();
    successResponse(res, { isSaved: post.isSaved }, 'Post updated');
  } catch (error) {
    errorResponse(res, error.message);
  }
};

const deletePost = async (req, res) => {
  try {
    const post = await GeneratedPost.findById(req.params.id);
    if (!post || post.user.toString() !== req.user._id.toString()) {
      return errorResponse(res, 'Post not found', 404);
    }
    await GeneratedPost.deleteOne({ _id: post._id });
    successResponse(res, null, 'Post deleted');
  } catch (error) {
    errorResponse(res, error.message);
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

module.exports = { generatePost, getPosts, savePost, deletePost };
