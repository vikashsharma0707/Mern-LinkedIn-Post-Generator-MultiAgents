const { callOpenRouter } = require('../services/openrouter.service');

const researchAgent = async (topic, industry, audience) => {
  const prompt = `Research and analyze the following topic for LinkedIn content generation.

Topic: ${topic}
Industry: ${industry}
Target Audience: ${audience}

Provide a comprehensive research brief covering:
1. Key insights and trends related to this topic
2. Common pain points and challenges in this industry
3. What the target audience cares about
4. Relevant statistics or data points (use realistic ones if specific data isn't available)
5. Current conversations happening on LinkedIn about this topic
6. Expert opinions or frameworks that could be referenced

Keep the analysis concise but actionable. Return the response as a structured research brief.`;

  const research = await callOpenRouter(prompt, 'gemini', {
    temperature: 0.5,
    maxTokens: 2000,
    systemPrompt: 'You are an expert research analyst who specializes in LinkedIn content trends, industry analysis, and audience research. You provide detailed, actionable research briefs for content creators.'
  });

  return {
    topic,
    industry,
    audience,
    research,
    timestamp: new Date()
  };
};

module.exports = researchAgent;
