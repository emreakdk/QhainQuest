/**
 * AI Assistant API Endpoint
 * 
 * This endpoint provides AI-powered features for the ChainQuest learning platform:
 * - Quiz explanations and help
 * - Learning recommendations
 * - Concept explanations
 * 
 * Integration with Huawei Cloud LLM:
 * - Configure HUAWEI_LLM_BASE_URL and HUAWEI_LLM_API_KEY in environment variables
 * - The service is designed to work with Huawei Cloud's Pangu Model or similar LLM services
 * 
 * TODO: Replace mock implementation with actual Huawei Cloud LLM API calls
 */

export default async function handler(req, res) {
  // CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.setHeader('Content-Type', 'application/json');

  if (req.method === 'OPTIONS') {
    return res.status(204).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({
      success: false,
      error: 'Method not allowed. Use POST.',
      answer: null
    });
  }

  try {
    const { type, prompt, context, questId, userAddress } = req.body;

    // Validate request
    if (!type || !prompt) {
      return res.status(400).json({
        success: false,
        error: 'Missing required fields: type and prompt are required.',
        answer: null
      });
    }

    // Validate type
    const validTypes = ['explain', 'recommend', 'help', 'analyze'];
    if (!validTypes.includes(type)) {
      return res.status(400).json({
        success: false,
        error: `Invalid type. Must be one of: ${validTypes.join(', ')}`,
        answer: null
      });
    }

    // Get AI response based on type
    const aiResponse = await getAIResponse(type, prompt, context, questId, userAddress);

    return res.status(200).json({
      success: true,
      answer: aiResponse,
      data: {
        type,
        response: aiResponse,
        timestamp: new Date().toISOString()
      },
      error: null
    });

  } catch (error) {
    console.error('[AI Assistant] Error:', error);
    return res.status(500).json({
      success: false,
      error: error.message || 'AI service error.',
      answer: null,
      details: process.env.NODE_ENV === 'development' ? error.message : 'An unexpected error occurred.'
    });
  }
}

/**
 * Get AI response based on request type
 * 
 * TODO: Replace this with actual Huawei Cloud LLM API integration
 * 
 * @param {string} type - Request type: 'explain', 'recommend', 'help', 'analyze'
 * @param {string} prompt - User's question or prompt
 * @param {object} context - Additional context (quest data, user progress, etc.)
 * @param {string} questId - Optional quest ID
 * @param {string} userAddress - Optional user address
 * @returns {Promise<string>} AI-generated response
 */
async function getAIResponse(type, prompt, context = {}, questId = null, userAddress = null) {
  // Huawei Cloud LLM Configuration
  const HUAWEI_LLM_BASE_URL = process.env.HUAWEI_LLM_BASE_URL;
  const HUAWEI_LLM_API_KEY = process.env.HUAWEI_LLM_API_KEY;
  const HUAWEI_LLM_MODEL = process.env.HUAWEI_LLM_MODEL || 'pangu-alpha';

  // Check if Huawei Cloud credentials are configured
  if (HUAWEI_LLM_BASE_URL && HUAWEI_LLM_API_KEY) {
    try {
      return await callHuaweiLLM(type, prompt, context, questId, userAddress);
    } catch (error) {
      console.error('[AI Assistant] Huawei LLM call failed, falling back to mock:', error);
      // Fall back to mock response if API call fails
    }
  } else {
    console.log('[AI Assistant] Huawei Cloud LLM not configured, using mock response');
    console.log('[AI Assistant] To enable: Set HUAWEI_LLM_BASE_URL and HUAWEI_LLM_API_KEY environment variables');
  }

  // Mock response for development/demo (remove when Huawei Cloud is integrated)
  return getMockAIResponse(type, prompt, context, questId);
}

/**
 * Call Huawei Cloud LLM API
 * 
 * TODO: Implement actual Huawei Cloud LLM API integration
 * Reference: https://support.huaweicloud.com/en-us/api-pangu/pangu_02_0001.html
 * 
 * @param {string} type - Request type
 * @param {string} prompt - User prompt
 * @param {object} context - Additional context
 * @param {string} questId - Quest ID
 * @param {string} userAddress - User address
 * @returns {Promise<string>} AI response
 */
async function callHuaweiLLM(type, prompt, context, questId, userAddress) {
  const HUAWEI_LLM_BASE_URL = process.env.HUAWEI_LLM_BASE_URL;
  const HUAWEI_LLM_API_KEY = process.env.HUAWEI_LLM_API_KEY;
  const HUAWEI_LLM_MODEL = process.env.HUAWEI_LLM_MODEL || 'pangu-alpha';

  // Build system prompt based on type
  const systemPrompt = buildSystemPrompt(type, context, questId);
  const fullPrompt = `${systemPrompt}\n\nUser Question: ${prompt}`;

  // TODO: Replace with actual Huawei Cloud API call
  // Example structure (adjust based on actual Huawei Cloud API):
  /*
  const response = await fetch(`${HUAWEI_LLM_BASE_URL}/v1/chat/completions`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${HUAWEI_LLM_API_KEY}`
    },
    body: JSON.stringify({
      model: HUAWEI_LLM_MODEL,
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: prompt }
      ],
      temperature: 0.7,
      max_tokens: 1000
    })
  });

  const data = await response.json();
  return data.choices[0].message.content;
  */

  // Placeholder - replace with actual implementation
  throw new Error('Huawei Cloud LLM integration not yet implemented');
}

/**
 * Build system prompt based on request type
 */
function buildSystemPrompt(type, context, questId) {
  const basePrompt = 'You are an AI assistant for ChainQuest, a blockchain learning platform. ';
  
  switch (type) {
    case 'explain':
      return `${basePrompt}Explain blockchain concepts clearly and concisely. Use examples when helpful.`;
    
    case 'recommend':
      return `${basePrompt}Recommend learning paths and quests based on user progress and interests.`;
    
    case 'help':
      return `${basePrompt}Help users understand quiz questions and provide hints without giving away answers.`;
    
    case 'analyze':
      return `${basePrompt}Analyze user progress and provide personalized learning insights.`;
    
    default:
      return basePrompt;
  }
}

/**
 * Mock AI responses for development/demo
 * Remove this when Huawei Cloud LLM is integrated
 */
function getMockAIResponse(type, prompt, context, questId) {
  const lowerPrompt = prompt.toLowerCase();

  switch (type) {
    case 'explain':
      if (lowerPrompt.includes('blockchain') || lowerPrompt.includes('block chain')) {
        return 'A blockchain is a distributed ledger technology that maintains a continuously growing list of records (blocks) that are linked and secured using cryptography. Each block contains a cryptographic hash of the previous block, a timestamp, and transaction data. This creates an immutable chain of data that is transparent and decentralized, meaning no single entity controls it.';
      }
      if (lowerPrompt.includes('stellar') || lowerPrompt.includes('xlm')) {
        return 'Stellar is an open-source, decentralized payment network that enables fast, low-cost cross-border transactions. It uses its native cryptocurrency, Lumens (XLM), and supports custom tokens. Stellar\'s consensus protocol allows for quick transaction settlement (3-5 seconds) and very low fees, making it ideal for micropayments and remittances.';
      }
      if (lowerPrompt.includes('smart contract')) {
        return 'A smart contract is a self-executing contract with the terms of the agreement directly written into code. When predefined conditions are met, the contract automatically executes the agreed-upon actions. Smart contracts run on blockchain networks like Ethereum or Stellar, ensuring transparency, security, and automation without intermediaries.';
      }
      return `I'd be happy to explain "${prompt}". In the context of blockchain technology, this concept relates to decentralized systems that enable secure, transparent transactions without central authorities. Would you like me to elaborate on any specific aspect?`;

    case 'recommend':
      const recommendations = [
        'Based on your progress, I recommend starting with "Stellar Fundamentals" to build a strong foundation.',
        'You\'ve completed several beginner quests! Consider moving to intermediate topics like "DeFi Basics" or "Smart Contracts 101".',
        'For a well-rounded understanding, try exploring different categories: blockchain basics, DeFi, and NFTs.',
        'Since you\'re interested in tokens, I suggest the "Token Economics" quest next.'
      ];
      return recommendations[Math.floor(Math.random() * recommendations.length)];

    case 'help':
      return 'I can help you understand this question better. Here\'s a hint: Think about the core principles of blockchain technology - decentralization, immutability, and transparency. Consider what makes blockchain different from traditional databases. Try to eliminate obviously incorrect options first, then focus on the remaining choices.';

    case 'analyze':
      return 'Based on your learning progress, you\'re doing great! You\'ve completed several quests and are building a solid foundation in blockchain technology. I recommend focusing on areas where you\'ve had difficulty, and consider revisiting completed quests to reinforce your understanding.';

    default:
      return 'I\'m here to help you learn about blockchain technology. How can I assist you today?';
  }
}

