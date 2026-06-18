const { callOpenRouter } = require('../services/openrouter.service');

const reviewerAgent = async (postData, model = 'gemini') => {
  const prompt = `Review and analyze the following LinkedIn post for quality, engagement potential, and viral score.

Post Content:
${postData.post}

Hashtags:
${postData.hashtagString || ''}

Topic: ${postData.topic}
Industry: ${postData.industry}
Tone: ${postData.tone}

Provide a comprehensive review with:

1. IMPROVED VERSION:
Write a refined version of the post with better hook, clearer structure, and stronger CTA.

2. ENGAGEMENT SCORE (0-100):
Rate the post's potential for likes, comments, and shares.

3. READABILITY SCORE (0-100):
Rate how easy and pleasant the post is to read.

4. HOOK STRENGTH (0-100):
Rate how compelling the opening line is.

5. VIRAL POTENTIAL (0-100):
Rate the overall likelihood of the post going viral.

6. SUGGESTED IMPROVEMENTS:
List 3-5 specific improvements that could be made.

7. BETTER CTA:
Suggest a stronger call-to-action if the current one is weak.

Return the response in a structured format with clear sections.`;

  const review = await callOpenRouter(prompt, model, {
    temperature: 0.5,
    maxTokens: 3000,
    systemPrompt: 'You are a LinkedIn content reviewer and strategist who specializes in analyzing post performance potential. You provide honest, actionable feedback with specific scores and improvement suggestions.'
  });

  const scores = extractScores(review);

  return {
    ...postData,
    review,
    scores,
    finalPost: postData.post,
    finalHashtags: postData.hashtagString || '',
    timestamp: new Date()
  };
};

const extractScores = (review) => {
  const scores = {
    engagement: 75,
    readability: 75,
    hookStrength: 75,
    viralPotential: 75
  };

  const engagementMatch = review.match(/(?:Engagement Score|engagement)\s*[:\-]?\s*(\d+)/i);
  const readabilityMatch = review.match(/(?:Readability Score|readability)\s*[:\-]?\s*(\d+)/i);
  const hookMatch = review.match(/(?:Hook Strength|hook)\s*[:\-]?\s*(\d+)/i);
  const viralMatch = review.match(/(?:Viral Potential|viral)\s*[:\-]?\s*(\d+)/i);

  if (engagementMatch) scores.engagement = parseInt(engagementMatch[1]);
  if (readabilityMatch) scores.readability = parseInt(readabilityMatch[1]);
  if (hookMatch) scores.hookStrength = parseInt(hookMatch[1]);
  if (viralMatch) scores.viralPotential = parseInt(viralMatch[1]);

  scores.overall = Math.round((scores.engagement + scores.readability + scores.hookStrength + scores.viralPotential) / 4);

  return scores;
};

module.exports = reviewerAgent;
