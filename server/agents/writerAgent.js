const { callOpenRouter } = require('../services/openrouter.service');

const writerAgent = async (planData, model = 'gemini') => {
  const prompt = `Write a complete LinkedIn post based on the following content plan.

Research Data:
${planData.research}

Content Plan:
${planData.plan}

Topic: ${planData.topic}
Industry: ${planData.industry}
Target Audience: ${planData.audience}
Tone: ${planData.tone}
Length: ${planData.length}

Generate a complete, professional LinkedIn post that includes:
- A strong hook (attention-grabbing first line)
- Well-structured body with clear value
- A compelling call-to-action
- Professional formatting with line breaks for readability
- Relevant emojis where appropriate (🚀 🔥 💡 ✅ 📈 🤖 ⚡ 🎯)

Make the post engaging, actionable, and designed for high engagement on LinkedIn. The content should feel authentic and valuable, not overly promotional.`;

  const post = await callOpenRouter(prompt, model, {
    temperature: 0.7,
    maxTokens: 4000,
    systemPrompt: 'You are an expert LinkedIn content writer who creates high-performing posts. You understand what makes content engaging on LinkedIn and write in an authentic, professional style that drives engagement, comments, and shares.'
  });

  return {
    ...planData,
    post,
    timestamp: new Date()
  };
};

module.exports = writerAgent;
