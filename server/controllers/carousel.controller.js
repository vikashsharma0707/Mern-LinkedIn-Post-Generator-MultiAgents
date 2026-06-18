const { callOpenRouter } = require('../services/openrouter.service');
const History = require('../models/History');
const Analytics = require('../models/Analytics');
const { successResponse, errorResponse } = require('../utils/response');

const generateCarousel = async (req, res) => {
  try {
    const { topic, industry, audience, tone, slideCount = 5, model = 'gemini' } = req.body;

    if (!topic) {
      return errorResponse(res, 'Topic is required', 400);
    }

    const prompt = `Generate a LinkedIn carousel content outline for the following topic.

Topic: ${topic}
Industry: ${industry || 'General'}
Target Audience: ${audience || 'General'}
Tone: ${tone || 'Professional'}
Number of Slides: ${slideCount}

Create a carousel with exactly ${slideCount} slides. Each slide should have:
- A clear title/heading
- Concise, scannable content (bullet points preferred)
- Actionable insights
- Professional formatting

Typical carousel structure:
Slide 1: Hook/Title (eye-catching headline)
Slide 2: Problem/Context (the pain point)
Slide 3: Solution/Insight (the main value)
Slide 4: Example/Proof (case study or example)
Slide 5: Conclusion/CTA (what to do next)

Return the response as a structured carousel with each slide clearly labeled (Slide 1, Slide 2, etc.) and include title and content for each.`;

    const carousel = await callOpenRouter(prompt, model, {
      temperature: 0.7,
      maxTokens: 3000,
      systemPrompt: 'You are a LinkedIn carousel content strategist who creates high-engagement carousel posts. You design slides that are visually scannable, information-dense, and drive engagement.'
    });

    const slides = parseCarousel(carousel);

    await History.create({
      user: req.user._id,
      type: 'carousel',
      title: topic,
      input: { topic, industry, audience, tone, slideCount },
      output: { slides, carousel }
    });

    await updateAnalytics(req.user._id, 'carousel');

    successResponse(res, {
      slides,
      rawContent: carousel,
      topic,
      slideCount
    }, 'Carousel generated successfully');
  } catch (error) {
    console.error('Carousel generation error:', error);
    errorResponse(res, error.message || 'Failed to generate carousel');
  }
};

const parseCarousel = (text) => {
  const slides = [];
  const slideMatches = text.split(/Slide\s*\d+[:\s]*/i).filter(s => s.trim());

  let slideNum = 1;
  slideMatches.forEach((match) => {
    if (match.trim()) {
      const lines = match.trim().split('\n').filter(l => l.trim());
      const title = lines[0]?.replace(/\*\*/g, '').replace(/^[:\s]+/, '').trim() || `Slide ${slideNum}`;
      const content = lines.slice(1).join('\n').trim();
      slides.push({
        number: slideNum,
        title,
        content: content || title
      });
      slideNum++;
    }
  });

  return slides;
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

module.exports = { generateCarousel };
