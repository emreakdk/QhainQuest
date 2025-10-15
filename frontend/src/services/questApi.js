// Quest API Service for secure quest completion
// This service handles communication with the backend API

class QuestApiService {
  constructor() {
    // API base URL - will be set based on environment
    // In production, this will use the Vercel deployment URL
    this.baseUrl = import.meta.env.VITE_API_URL || '/api';
    this.timeout = 30000; // 30 seconds
  }

  /**
   * Complete a quest by submitting answers to the secure backend
   * @param {string} userAddress - User's Stellar wallet address
   * @param {string} questId - ID of the quest being completed
   * @param {Array} answers - Array of user's answers
   * @returns {Promise<Object>} API response
   */
  async completeQuest(userAddress, questId, answers) {
    try {
      const response = await fetch(`${this.baseUrl}/complete-quest`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userAddress,
          questId,
          answers
        }),
        signal: AbortSignal.timeout(this.timeout)
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || `HTTP ${response.status}: ${response.statusText}`);
      }

      return {
        success: true,
        data: data.data,
        message: data.message
      };

    } catch (error) {
      console.error('Quest completion API error:', error);
      
      // Handle different types of errors
      if (error.name === 'AbortError') {
        throw new Error('Request timeout. Please try again.');
      }
      
      if (error.message.includes('Quest already completed')) {
        throw new Error('Bu quest\'i zaten tamamladınız.');
      }
      
      if (error.message.includes('Invalid answers')) {
        throw new Error('Cevaplarınız doğru değil. Lütfen tekrar deneyin.');
      }
      
      if (error.message.includes('Token payment failed')) {
        throw new Error('Token ödülü gönderilemedi. Lütfen daha sonra tekrar deneyin.');
      }

      throw new Error(error.message || 'Quest tamamlanırken bir hata oluştu.');
    }
  }

  /**
   * Check if a user has completed a specific quest
   * @param {string} userAddress - User's Stellar wallet address
   * @param {string} questId - ID of the quest to check
   * @returns {Promise<boolean>} Whether the quest is completed
   */
  async isQuestCompleted(userAddress, questId) {
    try {
      // For now, we'll use localStorage as a fallback
      // In production, this should be a separate API endpoint
      const completedQuests = JSON.parse(localStorage.getItem('completedQuests') || '[]');
      return completedQuests.includes(`${userAddress}-${questId}`);
    } catch (error) {
      console.error('Error checking quest completion:', error);
      return false;
    }
  }

  /**
   * Mark a quest as completed in local storage
   * @param {string} userAddress - User's Stellar wallet address
   * @param {string} questId - ID of the completed quest
   */
  markQuestCompleted(userAddress, questId) {
    try {
      const completedQuests = JSON.parse(localStorage.getItem('completedQuests') || '[]');
      const completionKey = `${userAddress}-${questId}`;
      
      if (!completedQuests.includes(completionKey)) {
        completedQuests.push(completionKey);
        localStorage.setItem('completedQuests', JSON.stringify(completedQuests));
      }
    } catch (error) {
      console.error('Error marking quest as completed:', error);
    }
  }

  /**
   * Get user's completed quests from local storage
   * @param {string} userAddress - User's Stellar wallet address
   * @returns {Array} Array of completed quest IDs
   */
  getCompletedQuests(userAddress) {
    try {
      const completedQuests = JSON.parse(localStorage.getItem('completedQuests') || '[]');
      return completedQuests
        .filter(key => key.startsWith(`${userAddress}-`))
        .map(key => key.replace(`${userAddress}-`, ''));
    } catch (error) {
      console.error('Error getting completed quests:', error);
      return [];
    }
  }

  /**
   * Clear completed quests for a user (useful for testing)
   * @param {string} userAddress - User's Stellar wallet address
   */
  clearCompletedQuests(userAddress) {
    try {
      const completedQuests = JSON.parse(localStorage.getItem('completedQuests') || '[]');
      const filteredQuests = completedQuests.filter(key => !key.startsWith(`${userAddress}-`));
      localStorage.setItem('completedQuests', JSON.stringify(filteredQuests));
    } catch (error) {
      console.error('Error clearing completed quests:', error);
    }
  }
}

// Export singleton instance
export const questApiService = new QuestApiService();
export default questApiService;
