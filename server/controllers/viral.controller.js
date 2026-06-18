const { callOpenRouter } = require('../services/openrouter.service');
const History = require('../models/History');
const { successResponse, errorResponse } = require('../utils/response');

const analyzeViral = async (req, res) => {
  try {
    const { content, model = 'gemini' } = req.body;

    if (!content || content.trim().length < 10) {
      return errorResponse(res, 'Post content is required (min 10 chars)', 400);
    }

    const prompt = `Analyze the following LinkedIn post and provide a detailed viral score analysis.

Post Content:
${content}

Provide a comprehensive analysis with:

1. ENGAGEMENT SCORE (0-100):
Rate the post's potential for likes, comments, and shares. Explain why.

2. READABILITY SCORE (0-100):
Rate how easy and pleasant the post is to read. Consider sentence length, structure, and flow.

3. HOOK STRENGTH (0-100):
Rate how compelling the opening line is. Does it stop the scroll?

4. VIRAL POTENTIAL (0-100):
Rate the overall likelihood of this post going viral on LinkedIn.

5. OVERALL SCORE (0-100):
Average of all scores.

6. STRENGTHS:
List 3-4 things this post does well.

7. WEAKNESSES:
List 3-4 things that could be improved.

8. ACTIONABLE IMPROVEMENTS:
Provide 5 specific, actionable improvements that could increase the viral score.

9. FORMATTING SCORE (0-100):
Rate the visual formatting and readability.

10. CTA EFFECTIVENESS (0-100):
Rate the call-to-action quality.

Return the response in a structured format with clear sections and scores.`;

    const analysis = await callOpenRouter(prompt, model, {
      temperature: 0.5,
      maxTokens: 3000,
      systemPrompt: 'You are a viral content analyst who specializes in LinkedIn post performance. You provide detailed, honest scores and actionable improvement suggestions.'
    });

    const scores = extractScores(analysis);
    const strengths = extractSection(analysis, 'STRENGTHS');
    const weaknesses = extractSection(analysis, 'WEAKNESSES');
    const improvements = extractSection(analysis, 'ACTIONABLE IMPROVEMENTS');

    await History.create({
      user: req.user._id,
      type: 'viral',
      title: 'Viral Analysis',
      input: { content },
      output: { scores, analysis }
    });

    successResponse(res, {
      scores,
      analysis,
      strengths,
      weaknesses,
      improvements,
      content
    }, 'Viral analysis completed');
  } catch (error) {
    console.error('Viral analysis error:', error);
    errorResponse(res, error.message || 'Failed to analyze viral potential');
  }
};

const extractScores = (text) => {
  const scores = {
    engagement: 0,
    readability: 0,
    hookStrength: 0,
    viralPotential: 0,
    overall: 0,
    formatting: 0,
    ctaEffectiveness: 0
  };

  const patterns = [
    { key: 'engagement', regex: /(?:Engagement Score|engagement)\s*[:\-]?\s*(\d+)/i },
    { key: 'readability', regex: /(?:Readability Score|readability)\s*[:\-]?\s*(\d+)/i },
    { key: 'hookStrength', regex: /(?:Hook Strength|hook)\s*[:\-]?\s*(\d+)/i },
    { key: 'viralPotential', regex: /(?:Viral Potential|viral)\s*[:\-]?\s*(\d+)/i },
    { key: 'overall', regex: /(?:Overall Score|overall)\s*[:\-]?\s*(\d+)/i },
    { key: 'formatting', regex: /(?:Formatting Score|formatting)\s*[:\-]?\s*(\d+)/i },
    { key: 'ctaEffectiveness', regex: /(?:CTA Effectiveness|cta)\s*[:\-]?\s*(\d+)/i }
  ];

  patterns.forEach(({ key, regex }) => {
    const match = text.match(regex);
    if (match) {
      scores[key] = parseInt(match[1]);
    }
  });

  if (scores.overall === 0) {
    const total = scores.engagement + scores.readability + scores.hookStrength + scores.viralPotential;
    scores.overall = total > 0 ? Math.round(total / 4) : 0;
  }

  return scores;
};

const extractSection = (text, sectionName) => {
  const regex = new RegExp(`${sectionName}[:\s]*\n*([\s\S]*?)(?=\n\n\d*\.\s+[A-Z]|\n[A-Z][A-Z\s]+[:\s]*\n|$)`, 'i');
  const match = text.match(regex);
  return match ? match[1].trim() : '';
};

module.exports = { analyzeViral };
