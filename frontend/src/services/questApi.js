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
   * @param {string} userAddress - User's Stellar wallet address or 'demo' for demo mode
   * @param {string} questId - ID of the quest being completed
   * @param {Array} answers - Array of user's answers
   * @param {boolean} isDemoMode - Whether this is a demo mode request
   * @returns {Promise<Object>} API response
   */
  async completeQuest(userAddress, questId, answers, isDemoMode = false) {
    try {
      const response = await fetch(`${this.baseUrl}/complete-quest`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userAddress: isDemoMode ? null : userAddress,
          questId,
          answers,
          isDemoMode
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

  /**
   * Get claimable balance for a user from localStorage
   * @param {string} userAddress - User's Stellar wallet address
   * @returns {number} Claimable balance amount
   */
  getClaimableBalance(userAddress) {
    try {
      const key = `claimableBalance_${userAddress}`;
      const balance = localStorage.getItem(key);
      return balance ? parseFloat(balance) : 0;
    } catch (error) {
      console.error('Error getting claimable balance:', error);
      return 0;
    }
  }

  /**
   * Add reward to claimable balance
   * @param {string} userAddress - User's Stellar wallet address
   * @param {number} rewardAmount - Amount to add to claimable balance
   */
  addToClaimableBalance(userAddress, rewardAmount) {
    try {
      const key = `claimableBalance_${userAddress}`;
      const currentBalance = this.getClaimableBalance(userAddress);
      const newBalance = currentBalance + rewardAmount;
      localStorage.setItem(key, newBalance.toString());
      console.log(`Added ${rewardAmount} to claimable balance. New balance: ${newBalance}`);
    } catch (error) {
      console.error('Error adding to claimable balance:', error);
    }
  }

  /**
   * Reset claimable balance to 0
   * @param {string} userAddress - User's Stellar wallet address
   */
  resetClaimableBalance(userAddress) {
    try {
      const key = `claimableBalance_${userAddress}`;
      localStorage.setItem(key, '0');
      console.log('Claimable balance reset to 0');
    } catch (error) {
      console.error('Error resetting claimable balance:', error);
    }
  }

  /**
   * Claim tokens by calling the claim-tokens API
   * @param {string} userAddress - User's Stellar wallet address
   * @param {number} amount - Amount to claim
   * @returns {Promise<Object>} API response
   */
  async claimTokens(userAddress, amount) {
    try {
      const response = await fetch(`${this.baseUrl}/claim-tokens`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userAddress,
          amount
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
      console.error('Token claim API error:', error);

      // Handle different types of errors
      if (error.name === 'AbortError') {
        throw new Error('Request timeout. Please try again.');
      }

      if (error.message.includes('Token payment failed')) {
        throw new Error('Token ödülü gönderilemedi. Lütfen daha sonra tekrar deneyin.');
      }

      throw new Error(error.message || 'Token claim işlemi sırasında bir hata oluştu.');
    }
  }
}

// Export singleton instance
export const questApiService = new QuestApiService();
export default questApiService;
