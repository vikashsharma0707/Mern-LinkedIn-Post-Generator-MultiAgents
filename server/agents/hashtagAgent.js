const { callOpenRouter } = require('../services/openrouter.service');

const hashtagAgent = async (postData, model = 'gemini') => {
  const prompt = `Generate 10-15 highly relevant, optimized hashtags for the following LinkedIn post.

Post Content:
${postData.post}

Topic: ${postData.topic}
Industry: ${postData.industry}

Generate a mix of:
- Broad industry hashtags (high reach)
- Niche-specific hashtags (targeted audience)
- Trending hashtags (if relevant)
- Brand-specific or community hashtags

Return only the hashtags in a clean list format, one per line. Do not include any explanations or additional text. Make sure hashtags are professional and relevant to LinkedIn audiences.`;

  const hashtags = await callOpenRouter(prompt, model, {
    temperature: 0.5,
    maxTokens: 1000,
    systemPrompt: 'You are a hashtag strategist who specializes in LinkedIn hashtag optimization. You create hashtag combinations that maximize reach and engagement while maintaining relevance.'
  });

  const hashtagList = hashtags
    .split(/\n/)
    .map(tag => tag.trim().replace(/^#/, ''))
    .filter(tag => tag.length > 0)
    .slice(0, 15);

  return {
    ...postData,
    hashtags: hashtagList,
    hashtagString: hashtagList.map(tag => `#${tag}`).join(' '),
    timestamp: new Date()
  };
};

module.exports = hashtagAgent;
