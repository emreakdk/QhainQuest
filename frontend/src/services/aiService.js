/**
 * AI Service
 * 
 * Service layer for AI-powered features in ChainQuest.
 * Integrates with backend AI endpoints that connect to Huawei Cloud LLM.
 * 
 * All methods call the /api/ai-assistant endpoint as the single source of truth.
 * No mock responses - the API handles demo mode when credentials are missing.
 */

class AIService {
  constructor() {
    // Single API_BASE_URL constant
    // In local dev (localhost), use Vercel backend URL
    // In production (Vercel), use same origin (empty string)
    const API_BASE_URL = typeof window !== 'undefined' && window.location.hostname === "localhost" 
      ? "https://chainquest-app.vercel.app" 
      : "";
    
    // Store as instance property for use in methods
    this.API_BASE_URL = API_BASE_URL;
    this.timeout = 30000; // 30 seconds
    
    // Log for debugging
    if (import.meta.env.DEV) {
      console.log('[AI Service] Initialized with API_BASE_URL:', this.API_BASE_URL);
    }
  }

  /**
   * Build the full API URL for ai-assistant endpoint
   * Always uses exactly "/api/ai-assistant" path (no duplicate /api segments)
   * @returns {string} Full URL to the ai-assistant endpoint
   */
  getApiUrl() {
    // Build URL as: ${API_BASE_URL}/api/ai-assistant
    // If API_BASE_URL is empty, it becomes /api/ai-assistant (relative, same origin)
    // If API_BASE_URL is set, it becomes https://chainquest-app.vercel.app/api/ai-assistant
    // Ensure no double slashes by normalizing the base URL
    const base = this.API_BASE_URL ? this.API_BASE_URL.replace(/\/+$/, '') : '';
    return `${base}/api/ai-assistant`;
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
    // Always call the API endpoint - no mock responses
    try {
      const response = await fetch(this.getApiUrl(), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          type: 'explain',
          prompt,
          context,
          questId,
          language: language || 'en'
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

      // Return response with mode field
      return {
        success: true,
        response: data.answer || data.data?.response || data.response || '',
        mode: data.mode || data.data?.mode || 'demo', // 'huawei' or 'demo'
        type: data.data?.type || 'explain'
      };

    } catch (error) {
      console.error('[AI Service] Explain concept error:', error);
      
      if (error.name === 'AbortError') {
        throw new Error('Request timeout. Please try again.');
      }
      
      // Handle network/CORS errors with clear user-facing messages
      if (error.message && (
        error.message.includes('Failed to fetch') ||
        error.message.includes('NetworkError') ||
        error.message.includes('CORS') ||
        error.message.includes('Network request failed') ||
        error.message.includes('Missing Allow Origin')
      )) {
        throw new Error('Network error: Unable to connect to the AI service. This may be a CORS issue or the service is unavailable. Please check your connection and try again.');
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
  async getRecommendations(prompt, context = {}, userAddress = null, language = 'en') {
    // Always call the API endpoint - no mock responses
    try {
      const response = await fetch(this.getApiUrl(), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          type: 'recommend',
          prompt,
          context,
          userAddress,
          language: language || 'en'
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
        mode: data.mode || data.data?.mode || 'demo',
        type: data.data?.type || 'recommend'
      };

    } catch (error) {
      console.error('[AI Service] Get recommendations error:', error);
      
      if (error.name === 'AbortError') {
        throw new Error('Request timeout. Please try again.');
      }
      
      // Handle network/CORS errors with clear user-facing messages
      if (error.message && (
        error.message.includes('Failed to fetch') ||
        error.message.includes('NetworkError') ||
        error.message.includes('CORS') ||
        error.message.includes('Network request failed') ||
        error.message.includes('Missing Allow Origin')
      )) {
        throw new Error('Network error: Unable to connect to the AI service. This may be a CORS issue or the service is unavailable. Please check your connection and try again.');
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
  async getQuizHelp(prompt, context = {}, questId = null, language = 'en') {
    // Always call the API endpoint - no mock responses
    try {
      const response = await fetch(this.getApiUrl(), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          type: 'help',
          prompt,
          context,
          questId,
          language: language || 'en'
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
        mode: data.mode || data.data?.mode || 'demo',
        type: data.data?.type || 'help'
      };

    } catch (error) {
      console.error('[AI Service] Get quiz help error:', error);
      
      if (error.name === 'AbortError') {
        throw new Error('Request timeout. Please try again.');
      }
      
      // Handle network/CORS errors with clear user-facing messages
      if (error.message && (
        error.message.includes('Failed to fetch') ||
        error.message.includes('NetworkError') ||
        error.message.includes('CORS') ||
        error.message.includes('Network request failed') ||
        error.message.includes('Missing Allow Origin')
      )) {
        throw new Error('Network error: Unable to connect to the AI service. This may be a CORS issue or the service is unavailable. Please check your connection and try again.');
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
  async analyzeProgress(context = {}, userAddress = null, language = 'en') {
    // Always call the API endpoint - no mock responses
    try {
      const response = await fetch(this.getApiUrl(), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          type: 'analyze',
          prompt: 'Analyze my learning progress and provide insights.',
          context,
          userAddress,
          language: language || 'en'
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
        mode: data.mode || data.data?.mode || 'demo',
        type: data.data?.type || 'analyze'
      };

    } catch (error) {
      console.error('[AI Service] Analyze progress error:', error);
      
      if (error.name === 'AbortError') {
        throw new Error('Request timeout. Please try again.');
      }
      
      // Handle network/CORS errors with clear user-facing messages
      if (error.message && (
        error.message.includes('Failed to fetch') ||
        error.message.includes('NetworkError') ||
        error.message.includes('CORS') ||
        error.message.includes('Network request failed') ||
        error.message.includes('Missing Allow Origin')
      )) {
        throw new Error('Network error: Unable to connect to the AI service. This may be a CORS issue or the service is unavailable. Please check your connection and try again.');
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

