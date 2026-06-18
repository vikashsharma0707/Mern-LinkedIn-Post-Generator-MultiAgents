const { callOpenRouter } = require('../services/openrouter.service');

const plannerAgent = async (researchData, tone, length, additionalContext) => {
  const prompt = `Based on the following research data, create a detailed content structure for a LinkedIn post.

Research Data:
${researchData.research}

Tone: ${tone}
Length: ${length}
Additional Context: ${additionalContext || 'None'}

Create a detailed content plan including:
1. Post structure (hook, body, conclusion, CTA)
2. Key talking points to cover
3. Suggested flow and transitions
4. Emotional hooks to include
5. Storytelling elements if applicable
6. Call-to-action placement
7. Formatting recommendations

Return a structured plan that a writer can follow to create the final post.`;

  const plan = await callOpenRouter(prompt, 'llama', {
    temperature: 0.6,
    maxTokens: 2000,
    systemPrompt: 'You are a senior content strategist who specializes in LinkedIn content planning. You create detailed, well-structured content plans that maximize engagement and readability.'
  });

  return {
    ...researchData,
    plan,
    tone,
    length,
    timestamp: new Date()
  };
};

module.exports = plannerAgent;
