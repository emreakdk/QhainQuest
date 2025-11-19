/**
 * AI Service
 * 
 * Service layer for AI-powered features in ChainQuest.
 * Integrates with backend AI endpoints that connect to Huawei Cloud LLM.
 * 
 * In development mode, returns mocked responses to avoid API dependency.
 * In production, calls the actual API endpoint.
 */

class AIService {
  constructor() {
    this.baseUrl = import.meta.env.VITE_API_URL || '/api';
    this.timeout = 30000; // 30 seconds
    this.isDev = import.meta.env.DEV; // Vite dev mode detection
  }

  /**
   * Generate a mock AI response for local development
   * 
   * @param {string} type - Request type: 'explain', 'recommend', 'help', 'analyze'
   * @param {string} prompt - User's question or prompt
   * @param {object} context - Additional context
   * @returns {string} Mock AI response
   */
  getMockResponse(type, prompt, context = {}) {
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
        if (lowerPrompt.includes('token') || lowerPrompt.includes('cryptocurrency')) {
          return 'Tokens are digital assets that can represent various things on a blockchain: currency, ownership, access rights, or utility. They are created and managed through smart contracts or native blockchain protocols. In the Stellar network, tokens are called "assets" and can be issued by anyone, making it easy to create custom tokens for specific use cases.';
        }
        return `I'd be happy to explain "${prompt}". In the context of blockchain technology, this concept relates to decentralized systems that enable secure, transparent transactions without central authorities. Would you like me to elaborate on any specific aspect?`;

      case 'recommend':
        const recommendations = [
          'Based on your progress, I recommend starting with "Stellar Fundamentals" to build a strong foundation.',
          'You\'ve completed several beginner quests! Consider moving to intermediate topics like "DeFi Basics" or "Smart Contracts 101".',
          'For a well-rounded understanding, try exploring different categories: blockchain basics, DeFi, and NFTs.',
          'Since you\'re interested in tokens, I suggest the "Token Economics" quest next.',
          'Great progress! I recommend exploring "Advanced Blockchain Concepts" to deepen your understanding.'
        ];
        return recommendations[Math.floor(Math.random() * recommendations.length)];

      case 'help':
        return 'I can help you understand this question better. Here\'s a hint: Think about the core principles of blockchain technology - decentralization, immutability, and transparency. Consider what makes blockchain different from traditional databases. Try to eliminate obviously incorrect options first, then focus on the remaining choices.';

      case 'analyze':
        const completedQuests = context.completedQuests || 0;
        if (completedQuests === 0) {
          return 'Welcome to ChainQuest! You\'re just getting started. I recommend beginning with the "Stellar Fundamentals" quest to learn the basics of blockchain technology. Take your time and don\'t hesitate to ask questions!';
        } else if (completedQuests < 3) {
          return 'You\'re making good progress! You\'ve completed a few quests and are building a solid foundation. I recommend continuing with beginner-level quests to strengthen your understanding before moving to more advanced topics.';
        } else {
          return 'Excellent work! You\'ve completed several quests and are building a solid foundation in blockchain technology. I recommend focusing on areas where you\'ve had difficulty, and consider exploring intermediate topics to expand your knowledge.';
        }

      default:
        return 'I\'m here to help you learn about blockchain technology. How can I assist you today?';
    }
  }

  /**
   * Simulate API delay for mock responses
   * 
   * @param {number} min - Minimum delay in ms (default: 500)
   * @param {number} max - Maximum delay in ms (default: 800)
   * @returns {Promise<void>}
   */
  async simulateDelay(min = 500, max = 800) {
    const delay = Math.floor(Math.random() * (max - min + 1)) + min;
    return new Promise(resolve => setTimeout(resolve, delay));
  }

  /**
   * Get AI explanation for a concept or question
   * 
   * @param {string} prompt - User's question or concept to explain
   * @param {object} context - Additional context (quest data, etc.)
   * @param {string} questId - Optional quest ID
   * @param {string} language - Language code ('en' or 'tr')
   * @returns {Promise<object>} AI response
   */
  async explainConcept(prompt, context = {}, questId = null, language = 'en') {
    // In development mode, return mock response
    if (this.isDev) {
      await this.simulateDelay();
      const mockResponse = this.getMockResponse('explain', prompt, context);
      return {
        success: true,
        response: mockResponse,
        type: 'explain'
      };
    }

    // Production: call actual API
    try {
      const response = await fetch(`${this.baseUrl}/ai-assistant`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          type: 'explain',
          prompt,
          context,
          questId,
          language: language || 'en' // Pass language parameter
        }),
        signal: AbortSignal.timeout(this.timeout)
      });

      // Check if response is OK before parsing
      if (!response.ok) {
        // Try to parse error response, but handle empty body
        let errorData;
        const contentType = response.headers.get('content-type');
        if (contentType && contentType.includes('application/json')) {
          try {
            const text = await response.text();
            errorData = text ? JSON.parse(text) : { error: `HTTP ${response.status}: ${response.statusText}` };
          } catch (parseError) {
            errorData = { error: `HTTP ${response.status}: ${response.statusText}` };
          }
        } else {
          errorData = { error: `HTTP ${response.status}: ${response.statusText}` };
        }
        throw new Error(errorData.error || errorData.message || `HTTP ${response.status}: ${response.statusText}`);
      }

      // Safely parse JSON response
      const contentType = response.headers.get('content-type');
      if (!contentType || !contentType.includes('application/json')) {
        throw new Error('Invalid response format. Expected JSON.');
      }

      const text = await response.text();
      if (!text || text.trim() === '') {
        throw new Error('Empty response from server.');
      }

      let data;
      try {
        data = JSON.parse(text);
      } catch (parseError) {
        console.error('[AI Service] JSON parse error:', parseError, 'Response text:', text);
        throw new Error('Invalid JSON response from server.');
      }

      // Check for error in response
      if (data.error) {
        throw new Error(data.error);
      }

      // Return response with answer field (for backward compatibility)
      return {
        success: true,
        response: data.answer || data.data?.response || data.response || '',
        type: data.data?.type || 'explain'
      };

    } catch (error) {
      console.error('[AI Service] Explain concept error:', error);
      
      if (error.name === 'AbortError') {
        throw new Error('Request timeout. Please try again.');
      }
      
      // Re-throw if it's already a meaningful Error
      if (error instanceof Error && error.message) {
        throw error;
      }
      
      throw new Error(error.message || 'Failed to get AI explanation. Please try again.');
    }
  }

  /**
   * Get AI learning recommendations
   * 
   * @param {string} prompt - User's question or request
   * @param {object} context - User progress, completed quests, etc.
   * @param {string} userAddress - User's wallet address
   * @returns {Promise<object>} AI recommendations
   */
  async getRecommendations(prompt, context = {}, userAddress = null) {
    // In development mode, return mock response
    if (this.isDev) {
      await this.simulateDelay();
      const mockResponse = this.getMockResponse('recommend', prompt, context);
      return {
        success: true,
        response: mockResponse,
        type: 'recommend'
      };
    }

    // Production: call actual API
    try {
      const response = await fetch(`${this.baseUrl}/ai-assistant`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          type: 'recommend',
          prompt,
          context,
          userAddress
        }),
        signal: AbortSignal.timeout(this.timeout)
      });

      // Check if response is OK before parsing
      if (!response.ok) {
        let errorData;
        const contentType = response.headers.get('content-type');
        if (contentType && contentType.includes('application/json')) {
          try {
            const text = await response.text();
            errorData = text ? JSON.parse(text) : { error: `HTTP ${response.status}: ${response.statusText}` };
          } catch (parseError) {
            errorData = { error: `HTTP ${response.status}: ${response.statusText}` };
          }
        } else {
          errorData = { error: `HTTP ${response.status}: ${response.statusText}` };
        }
        throw new Error(errorData.error || errorData.message || `HTTP ${response.status}: ${response.statusText}`);
      }

      // Safely parse JSON response
      const contentType = response.headers.get('content-type');
      if (!contentType || !contentType.includes('application/json')) {
        throw new Error('Invalid response format. Expected JSON.');
      }

      const text = await response.text();
      if (!text || text.trim() === '') {
        throw new Error('Empty response from server.');
      }

      let data;
      try {
        data = JSON.parse(text);
      } catch (parseError) {
        console.error('[AI Service] JSON parse error:', parseError, 'Response text:', text);
        throw new Error('Invalid JSON response from server.');
      }

      // Check for error in response
      if (data.error) {
        throw new Error(data.error);
      }

      return {
        success: true,
        response: data.answer || data.data?.response || data.response || '',
        type: data.data?.type || 'recommend'
      };

    } catch (error) {
      console.error('[AI Service] Get recommendations error:', error);
      
      if (error.name === 'AbortError') {
        throw new Error('Request timeout. Please try again.');
      }
      
      if (error instanceof Error && error.message) {
        throw error;
      }
      
      throw new Error(error.message || 'Failed to get AI recommendations. Please try again.');
    }
  }

  /**
   * Get AI help for a quiz question
   * 
   * @param {string} prompt - User's question or request for help
   * @param {object} context - Quest and question context
   * @param {string} questId - Quest ID
   * @returns {Promise<object>} AI help response
   */
  async getQuizHelp(prompt, context = {}, questId = null) {
    // In development mode, return mock response
    if (this.isDev) {
      await this.simulateDelay();
      const mockResponse = this.getMockResponse('help', prompt, context);
      return {
        success: true,
        response: mockResponse,
        type: 'help'
      };
    }

    // Production: call actual API
    try {
      const response = await fetch(`${this.baseUrl}/ai-assistant`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          type: 'help',
          prompt,
          context,
          questId
        }),
        signal: AbortSignal.timeout(this.timeout)
      });

      // Check if response is OK before parsing
      if (!response.ok) {
        let errorData;
        const contentType = response.headers.get('content-type');
        if (contentType && contentType.includes('application/json')) {
          try {
            const text = await response.text();
            errorData = text ? JSON.parse(text) : { error: `HTTP ${response.status}: ${response.statusText}` };
          } catch (parseError) {
            errorData = { error: `HTTP ${response.status}: ${response.statusText}` };
          }
        } else {
          errorData = { error: `HTTP ${response.status}: ${response.statusText}` };
        }
        throw new Error(errorData.error || errorData.message || `HTTP ${response.status}: ${response.statusText}`);
      }

      // Safely parse JSON response
      const contentType = response.headers.get('content-type');
      if (!contentType || !contentType.includes('application/json')) {
        throw new Error('Invalid response format. Expected JSON.');
      }

      const text = await response.text();
      if (!text || text.trim() === '') {
        throw new Error('Empty response from server.');
      }

      let data;
      try {
        data = JSON.parse(text);
      } catch (parseError) {
        console.error('[AI Service] JSON parse error:', parseError, 'Response text:', text);
        throw new Error('Invalid JSON response from server.');
      }

      // Check for error in response
      if (data.error) {
        throw new Error(data.error);
      }

      return {
        success: true,
        response: data.answer || data.data?.response || data.response || '',
        type: data.data?.type || 'help'
      };

    } catch (error) {
      console.error('[AI Service] Get quiz help error:', error);
      
      if (error.name === 'AbortError') {
        throw new Error('Request timeout. Please try again.');
      }
      
      if (error instanceof Error && error.message) {
        throw error;
      }
      
      throw new Error(error.message || 'Failed to get AI help. Please try again.');
    }
  }

  /**
   * Analyze user progress and provide insights
   * 
   * @param {object} context - User progress data
   * @param {string} userAddress - User's wallet address
   * @returns {Promise<object>} AI analysis
   */
  async analyzeProgress(context = {}, userAddress = null) {
    // In development mode, return mock response
    if (this.isDev) {
      await this.simulateDelay();
      const mockResponse = this.getMockResponse('analyze', 'Analyze my learning progress and provide insights.', context);
      return {
        success: true,
        response: mockResponse,
        type: 'analyze'
      };
    }

    // Production: call actual API
    try {
      const response = await fetch(`${this.baseUrl}/ai-assistant`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          type: 'analyze',
          prompt: 'Analyze my learning progress and provide insights.',
          context,
          userAddress
        }),
        signal: AbortSignal.timeout(this.timeout)
      });

      // Check if response is OK before parsing
      if (!response.ok) {
        let errorData;
        const contentType = response.headers.get('content-type');
        if (contentType && contentType.includes('application/json')) {
          try {
            const text = await response.text();
            errorData = text ? JSON.parse(text) : { error: `HTTP ${response.status}: ${response.statusText}` };
          } catch (parseError) {
            errorData = { error: `HTTP ${response.status}: ${response.statusText}` };
          }
        } else {
          errorData = { error: `HTTP ${response.status}: ${response.statusText}` };
        }
        throw new Error(errorData.error || errorData.message || `HTTP ${response.status}: ${response.statusText}`);
      }

      // Safely parse JSON response
      const contentType = response.headers.get('content-type');
      if (!contentType || !contentType.includes('application/json')) {
        throw new Error('Invalid response format. Expected JSON.');
      }

      const text = await response.text();
      if (!text || text.trim() === '') {
        throw new Error('Empty response from server.');
      }

      let data;
      try {
        data = JSON.parse(text);
      } catch (parseError) {
        console.error('[AI Service] JSON parse error:', parseError, 'Response text:', text);
        throw new Error('Invalid JSON response from server.');
      }

      // Check for error in response
      if (data.error) {
        throw new Error(data.error);
      }

      return {
        success: true,
        response: data.answer || data.data?.response || data.response || '',
        type: data.data?.type || 'analyze'
      };

    } catch (error) {
      console.error('[AI Service] Analyze progress error:', error);
      
      if (error.name === 'AbortError') {
        throw new Error('Request timeout. Please try again.');
      }
      
      if (error instanceof Error && error.message) {
        throw error;
      }
      
      throw new Error(error.message || 'Failed to analyze progress. Please try again.');
    }
  }
}

export const aiService = new AIService();
export default aiService;

