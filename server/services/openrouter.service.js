const axios = require('axios');

const OPENROUTER_API_URL = 'https://openrouter.ai/api/v1/chat/completions';

const DEFAULT_MODELS = {
  gemini: 'google/gemini-2.0-flash-exp:free',
  llama: 'meta-llama/llama-3.3-70b-instruct',
  qwen: 'qwen/qwen-3-235b-a22b',
  mistral: 'mistralai/mistral-small-24b-instruct-2501'
};

const callOpenRouter = async (prompt, model = 'gemini', options = {}) => {
  try {
    const modelId = DEFAULT_MODELS[model] || DEFAULT_MODELS.gemini;
    const apiKey = process.env.OPENROUTER_API_KEY;
    if (!apiKey) {
      throw new Error('OpenRouter API key not configured');
    }
    const response = await axios.post(
      OPENROUTER_API_URL,
      {
        model: modelId,
        messages: [
          { role: 'system', content: options.systemPrompt || 'You are a professional LinkedIn content strategist and AI assistant.' },
          { role: 'user', content: prompt }
        ],
        temperature: options.temperature || 0.7,
        max_tokens: options.maxTokens || 4000
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`,
          'HTTP-Referer': 'https://linkedin-post-generator.com',
          'X-Title': 'LinkedIn Post Generator'
        }
      }
    );
    return response.data.choices[0].message.content;
  } catch (error) {
    console.error('OpenRouter Error:', error.response?.data || error.message);
    throw new Error('Failed to get AI response from OpenRouter');
  }
};

module.exports = { callOpenRouter, DEFAULT_MODELS };
