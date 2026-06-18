// const axios = require('axios');

// const OPENROUTER_API_URL = 'https://openrouter.ai/api/v1/chat/completions';

// const DEFAULT_MODELS = {
//   gemini: 'google/gemini-2.0-flash-exp:free',
//   llama: 'meta-llama/llama-3.3-70b-instruct',
//   qwen: 'qwen/qwen-3-235b-a22b',
//   mistral: 'mistralai/mistral-small-24b-instruct-2501'
// };

// const callOpenRouter = async (prompt, model = 'gemini', options = {}) => {
//   try {
//     const modelId = DEFAULT_MODELS[model] || DEFAULT_MODELS.gemini;
//     const apiKey = process.env.OPENROUTER_API_KEY;
//     if (!apiKey) {
//       throw new Error('OpenRouter API key not configured');
//     }
//     const response = await axios.post(
//       OPENROUTER_API_URL,
//       {
//         model: modelId,
//         messages: [
//           { role: 'system', content: options.systemPrompt || 'You are a professional LinkedIn content strategist and AI assistant.' },
//           { role: 'user', content: prompt }
//         ],
//         temperature: options.temperature || 0.7,
//         max_tokens: options.maxTokens || 4000
//       },
//       {
//         headers: {
//           'Content-Type': 'application/json',
//           'Authorization': `Bearer ${apiKey}`,
//           'HTTP-Referer': 'https://linkedin-post-generator.com',
//           'X-Title': 'LinkedIn Post Generator'
//         }
//       }
//     );
//     return response.data.choices[0].message.content;
//   } catch (error) {
//     console.error('OpenRouter Error:', error.response?.data || error.message);
//     throw new Error('Failed to get AI response from OpenRouter');
//   }
// };

// module.exports = { callOpenRouter, DEFAULT_MODELS };


const axios = require('axios');

const OPENROUTER_API_URL = 'https://openrouter.ai/api/v1/chat/completions';

const DEFAULT_MODELS = {
  gemini: 'google/gemini-2.5-flash',
  gemini_flash: 'google/gemini-2.5-flash',
  
  // Free Models (Best Working Right Now)
  llama: 'nvidia/nemotron-3-super-120b-a12b:free',
  qwen: 'nvidia/nemotron-3-super-120b-a12b:free',
  
  // Paid but more stable
  mistral: 'nvidia/nemotron-3-super-120b-a12b:free'
};

// Default free model
const DEFAULT_MODEL = 'meta-llama/llama-3.3-70b-instruct:free';

const callOpenRouter = async (prompt, model = 'llama', options = {}) => {
  let modelId = DEFAULT_MODELS[model] || DEFAULT_MODEL;

  // Allow overriding model
  if (options.model) {
    modelId = options.model;
  }

  try {
    const apiKey = process.env.OPENROUTER_API_KEY;
    if (!apiKey) {
      throw new Error('OpenRouter API key not configured in .env file');
    }

    const response = await axios.post(
      OPENROUTER_API_URL,
      {
        model: modelId,
        messages: [
          {
            role: 'system',
            content: options.systemPrompt || 'You are a professional LinkedIn content strategist and AI assistant.'
          },
          { role: 'user', content: prompt }
        ],
        temperature: options.temperature || 0.75,
        max_tokens: options.maxTokens || 4000,
        top_p: options.top_p || 0.95,
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`,
          'HTTP-Referer': 'https://linkedin-post-generator.com',
          'X-Title': 'LinkedIn Post Generator',
        }
      }
    );

    if (!response.data?.choices?.[0]?.message?.content) {
      throw new Error('Invalid response from OpenRouter');
    }

    return response.data.choices[0].message.content;

  } catch (error) {
    console.error('OpenRouter Error:', error.response?.data || error.message);

    // Rate limit handling
    if (error.response?.status === 429) {
      console.log(`Rate limit hit on ${modelId}. Waiting 8 seconds...`);
      await new Promise(resolve => setTimeout(resolve, 8000));
      
      // Try again with same model
      return callOpenRouter(prompt, model, options);
    }

    // Model fallback logic
    if (modelId.includes(':free') && model !== 'qwen') {
      console.log('Free model rate limited. Trying Qwen free...');
      return callOpenRouter(prompt, 'qwen', { ...options, model: DEFAULT_MODELS.qwen });
    }

    if (!modelId.includes(':free')) {
      console.log('Trying free fallback model...');
      return callOpenRouter(prompt, 'llama', { ...options, model: DEFAULT_MODEL });
    }

    throw new Error('Failed to get AI response from OpenRouter. Free models are busy. Try again in 1-2 minutes.');
  }
};

module.exports = { callOpenRouter, DEFAULT_MODELS };