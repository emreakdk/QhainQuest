
class QuestApiService {
  constructor() {
    this.baseUrl = import.meta.env.VITE_API_URL || '/api';
    this.timeout = 30000; // 30 seconds
  }

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

  async isQuestCompleted(userAddress, questId) {
    try {
      const completedQuests = JSON.parse(localStorage.getItem('completedQuests') || '[]');
      return completedQuests.includes(`${userAddress}-${questId}`);
    } catch (error) {
      console.error('Error checking quest completion:', error);
      return false;
    }
  }

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

  clearCompletedQuests(userAddress) {
    try {
      const completedQuests = JSON.parse(localStorage.getItem('completedQuests') || '[]');
      const filteredQuests = completedQuests.filter(key => !key.startsWith(`${userAddress}-`));
      localStorage.setItem('completedQuests', JSON.stringify(filteredQuests));
    } catch (error) {
      console.error('Error clearing completed quests:', error);
    }
  }

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

  resetClaimableBalance(userAddress) {
    try {
      const key = `claimableBalance_${userAddress}`;
      localStorage.setItem(key, '0');
      console.log('Claimable balance reset to 0');
    } catch (error) {
      console.error('Error resetting claimable balance:', error);
    }
  }

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

export const questApiService = new QuestApiService();
export default questApiService;
